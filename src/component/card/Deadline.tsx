interface DeadlineProps {
  deadline: string;
}

function Deadline({ deadline }: DeadlineProps) {
  return (
    <div className="bg-primary-200 px-3 py-2 rounded-md flex flex-row gap-2 text-primary">
      <img src="/assets/icons/clock.svg" width={15} alt="tugas" />
      <p className="truncate">
        {new Date(deadline).toLocaleDateString("id-ID")}
      </p>
    </div>
  );
}

export default Deadline;
