interface KuantitasProps{
    kuantitas: number
}

function Kuantitas({kuantitas}: KuantitasProps) {
    return (
        <div className="bg-primary-200 p-2 rounded-md flex flex-row gap-1 text-primary">
          <img src="/assets/icons/task.svg" width={15} alt="tugas" />
          <p>{kuantitas}</p>
        </div>
    )
}

export default Kuantitas;