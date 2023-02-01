import LogoutButton from "./LogoutButton";

export default function StudentDashboard() {
    return (
        <div className='flex w-full h-full'>
            <div className='flex flex-col justify-between w-80 h-full'>
                <div>
                    <div className='px-8 py-4'>
                        <p className='font-semibold text-lg text-gray-800'>
                            MUTEX
                        </p>
                    </div>
                    <div className='px-4'>
                        <nav className='mt-4'>
                            <ul>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 text-gray-700 bg-gray-100 rounded-md '
                                        href='#'
                                    >
                                        <span>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                className='w-6 h-6'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                                                />
                                            </svg>
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Home
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 mt-2 text-gray-600 rounded-md hover:bg-gray-200'
                                        href='#'
                                    >
                                        <span className='text-2xl'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke-width='1.5'
                                                stroke='currentColor'
                                                className='w-6 h-6'
                                            >
                                                <path
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    d='M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46'
                                                />
                                            </svg>
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Announcement
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 mt-2 text-gray-600 rounded-md hover:bg-gray-200'
                                        href='#'
                                    >
                                        <span className='text-2xl'>
                                            <i className='bx bx-store' />
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Projects
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 mt-2 text-gray-600 rounded-md hover:bg-gray-200'
                                        href='#'
                                    >
                                        <span className='text-2xl'>
                                            <i className='bx bx-calendar' />
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Calendar
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 mt-2 text-gray-600 rounded-md hover:bg-gray-200'
                                        href='#'
                                    >
                                        <span className='text-2xl'>
                                            <i className='bx bx-file' />
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Documents
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className='flex items-center px-4 py-1 mt-2 text-gray-700 rounded-md hover:bg-gray-200'
                                        href='#'
                                    >
                                        <span className='text-2xl'>
                                            <i className='bx bx-bar-chart' />
                                        </span>
                                        <span className='mx-3 font-medium'>
                                            Reports
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='px-8'>
                    <ul>
                        <li>
                            <a
                                className='flex items-center py-1 mt-2 text-gray-700 rounded-md hover:bg-gray-200'
                                href='#'
                            >
                                <span className='text-2xl'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                                        />
                                    </svg>
                                </span>
                                <span className='mx-3 font-medium'>
                                    <LogoutButton/>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex-1 w-full h-full'>
                <div>
                    <div className='px-8 py-4'>
                        <h1 className='font-bold text-2xl mb-4'>Dashboard</h1>
                    </div>
                    <div className='flex items-center justify-center p-40 border-4 border-dotted rounded-md'>
                        <h1 className='font-bold '> WELCOME TO CHAT SYSTEM </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
