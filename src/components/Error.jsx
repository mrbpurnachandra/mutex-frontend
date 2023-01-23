export default function Error({ error }) {
    return (
        <div className='border border-red-100 px-4 py-4 rounded-md bg-red-50'>
            <p className='text-sm text-red-500'>{error.message}</p>
        </div>
    )
}
