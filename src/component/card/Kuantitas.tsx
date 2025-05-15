interface KuantitasProps{
    kuantitas: number
}

function Kuantitas({kuantitas}: KuantitasProps) {
    return (
        <div className="bg-primary-200 py-2 px-3 items-center rounded-md flex flex-row gap-2 text-primary">
          <img src="/assets/icons/task.svg" width={15} alt="tugas" />
          <p>{kuantitas}</p>
        </div>
    )
}

export default Kuantitas;