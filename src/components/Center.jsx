export default function Center({ children }) {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='-mt-24'>{children}</div>
        </div>
    )
}
