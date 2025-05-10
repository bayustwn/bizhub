import { useParams } from "react-router";

function Anggota() {
    const { id } = useParams();
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

export default Anggota;