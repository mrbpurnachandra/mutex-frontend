export default function ErrorElement({ error }) {
    return <p className='mt-2 text-sm text-red-500'>{error.message}</p>
}
