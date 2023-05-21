import logoRectURL from '../static/images/logo-rect.png'

export default function Intro() {
    return (
        <div className='w-full h-full p-3 -mt-24 flex flex-col items-center justify-center'>
            <div>
                <img className='w-60' src={logoRectURL} alt='MUTEX' />
            </div>
            <div className='mt-4'>
                <p className='text-4xl uppercase font-semibold text-gray-600'>Sharing info is now easier and cleaner</p>
            </div>
        </div>
    )
}
