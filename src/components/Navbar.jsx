import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='bg-violet-700 flex justify-between items-center px-4 h-10'>
                <div className="logo text-white font-bold">PassLocker</div>
                <ul className='text-white'>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold'  href="/">Home</a>
                        <a className='hover:font-bold' href="">About</a>
                        <a className='hover:font-bold' href="">Contact Us</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
