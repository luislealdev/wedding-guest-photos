import { UploadMemoryForm } from "../components/UploadMemoryForm";

const UploadPage = () => {
    return (
        <main className="p-100 center-text">
            <h1 className="f-size-50">Agregar Momento</h1>
            <p className="mt-20">Gracias por acompañarnos en este día tan especial</p>
            <UploadMemoryForm />
        </main>
    )
}

export default UploadPage;