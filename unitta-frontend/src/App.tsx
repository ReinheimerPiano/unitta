import "./App.css";
import MyCalendar from "./components/Calendar";

function App() {
  const events = [
    {
      title: "Consulta com Ana",
      start: new Date(2025, 4, 8, 10, 0), // 9 de maio de 2024, 10:00
      end: new Date(2025, 4, 8, 11, 0), // 9 de maio de 2024, 11:00
    },
    {
      title: "Reunião com equipe",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
    {
      title: "Atendimento com Ana",
      start: new Date(2025, 4, 9, 9, 0), // 10 de maio de 2024, 09:00
      end: new Date(2025, 4, 9, 10, 0), // 10 de maio de 2024, 10:00
    },
    {
      title: "Supervisão clínica",
      start: new Date(2025, 4, 11, 14, 30),
      end: new Date(2025, 4, 11, 15, 30),
    },
    {
      title: "Consulta com João",
      start: new Date(2025, 4, 12, 16, 0),
      end: new Date(2025, 4, 12, 17, 0),
    },
    {
      title: "Reunião de equipe",
      start: new Date(2025, 4, 13, 10, 0),
      end: new Date(2025, 4, 13, 11, 0),
    },
    {
      title: "Consulta com Maria",
      start: new Date(2025, 4, 14, 9, 0),
      end: new Date(2025, 4, 14, 10, 0),
    },
    {
      title: "Atendimento com Carlos",
      start: new Date(2025, 4, 15, 11, 0),
      end: new Date(2025, 4, 15, 12, 0),
    },
    {
      title: "Supervisão clínica",
      start: new Date(2025, 4, 16, 14, 30),
      end: new Date(2025, 4, 16, 15, 30),
    },
  ];

  return (
    <main className="h-screen w-screen bg-gray-200 dark:bg-neutral-800">
      <MyCalendar events={events} />
    </main>
  );
}

export default App;
