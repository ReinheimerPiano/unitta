import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/calendar-dark.css";
import moment from "moment";
import "moment-timezone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useRef, useState } from "react";

moment.tz.setDefault("America/Sao_Paulo");

const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Dia inteiro",
  previous: "Voltar",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "Nenhum evento neste período.",
};

type EventType = {
  title: string;
  start: Date;
  end: Date;
};

const CustomEventWrapper = ({
  children,
  event,
}: React.PropsWithChildren<{
  event: EventType & { resource?: { [key: string]: string } };
}>) => {
  const testId = event?.resource?.["data-testid"];
  return <div data-testid={testId}>{children}</div>;
};

const MyCalendar = ({ events }: { events: EventType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<null | {
    start: Date;
    end: Date;
  }>(null);

  const [temporaryEvent, setTemporaryEvent] = useState<null | EventType>(null);
  const [dialogPosition, setDialogPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const eventIdRef = useRef<string>("");

  useEffect(() => {
    if (temporaryEvent) {
      const timer = setTimeout(() => {
        const el = document.querySelector(
          `[data-testid="${eventIdRef.current}"]`
        ) as HTMLElement;
        if (el) {
          const rect = el.getBoundingClientRect();

          // Evita que a modal fique fora da tela
          const maxLeft = window.innerWidth - 320;
          const maxTop = window.innerHeight - 240;

          setDialogPosition({
            top: Math.min(rect.top + window.scrollY, maxTop),
            left: Math.min(
              rect.left + rect.width + window.scrollX + 10,
              maxLeft
            ),
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [temporaryEvent]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    const id = `temp-${Date.now()}`;
    eventIdRef.current = id;

    setSelection({
      start: slotInfo.start,
      end: slotInfo.end,
    });

    setTemporaryEvent({
      title: "Nova reserva",
      start: slotInfo.start,
      end: slotInfo.end,
    });

    setIsOpen(true);
  };

  const closeDialog = () => {
    setSelection(null);
    setTemporaryEvent(null);
    setDialogPosition(null);
    setIsOpen(false);
  };

  const allEvents = temporaryEvent
    ? [
        ...events,
        {
          ...temporaryEvent,
          resource: { "data-testid": eventIdRef.current },
        },
      ]
    : events;

  return (
    <>
      <div className="h-full w-full p-4" data-theme="dark">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          culture="pt-BR"
          messages={messages}
          selectable
          onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo)}
          components={{ eventWrapper: CustomEventWrapper }}
        />
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) closeDialog();
        }}
      >
        <DialogContent
          style={{
            position: "absolute",
            top: dialogPosition?.top ?? 100,
            left: dialogPosition?.left ?? 100,
            zIndex: 50,
          }}
        >
          <DialogHeader>
            <DialogTitle>Nova reserva</DialogTitle>
            <DialogDescription>
              {selection && (
                <div>
                  Início: {selection.start.toLocaleString()} <br />
                  Fim: {selection.end.toLocaleString()}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={closeDialog}
            className="mt-2 px-3 py-1 rounded bg-red-500 text-white"
          >
            Cancelar
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyCalendar;
