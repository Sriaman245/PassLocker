import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {

    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passArray, setPassArray] = useState([])
    const ref = useRef();
    const passRef = useRef();


    //LOCAL STORAGE-
    // useEffect(() => {
    //     let passString = localStorage.getItem("passwords")
    //     if (passString) {
    //         let passwords = JSON.parse(localStorage.getItem("passwords"))
    //         setPassArray(passwords)
    //     }
    // }, [])

    // const saveToLS = () => {
    //     localStorage.setItem("passArray", JSON.stringify(passArray))
    // }

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPassArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const savePassword = async () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {

            setPassArray([...passArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            setForm({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }

    }



    const showPassword = () => {
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = "icons/eye.png"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passRef.current.type = "password"
        }
    }

    const copyText = (text) => {
        toast('Copy to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const editPass = async(id) => {
        console.log("Editing password with id ", id)
        setForm(passArray.filter(item => item.id === id)[0])
        setPassArray(passArray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id }) })

    }

    const deletePass = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPassArray(passArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition={Bounce}
            />
            <div>
                {/* for background - https://bg.ibelick.com/ */}

                <div className='py-10 md:px-64 min-h-screen min-w-full'>
                    <h1 className=' text-3xl font-bold text-center mb-3'>
                        <span className='text-violet-500'> &#123; &lt; </span>
                        <span className='text-white'>Pass</span>
                        <span className='text-violet-500'>Locker /&gt; &#125;</span>
                    </h1>
                    <p className='text-white text-md text-center mb-5'>Your own Password Manager</p>
                    <div className="flex flex-col p-4 gap-4 md:gap-8 items-center">
                        <input onChange={handleChange} value={form.site} name="site" id="site" type="text" placeholder='Enter Website URL' className='rounded-full w-full p-1 px-2 border-2 border-violet-700' />
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <input onChange={handleChange} value={form.username} name="username" id="username" type="text" placeholder="Enter Username" className='rounded-full w-full p-1 px-2 border-2 border-violet-700 ' />
                            <div className='relative'>
                                <input ref={passRef} onChange={handleChange} value={form.password} name="password" id="password" type="text" placeholder='Enter Password' className='rounded-full w-full p-1 px-2 border-2 border-violet-700' />
                                <span className='absolute right-[0px] top-[4px] cursor-pointer' onClick={showPassword} >
                                    <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>

                        <button onClick={savePassword} className='flex justify-center items-center font-bold px-5 py-2 gap-2  text-white w-fit text-md bg-violet-700 rounded-full'>
                            <lord-icon
                                src="https://cdn.lordicon.com/hqymfzvj.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ "width": "25px", "height": "25px" }}
                            >
                            </lord-icon>
                            Save</button>
                    </div>
                    <div className="passwords">
                        <h2 className='text-xl font-bold text-white py-4'>Your Passwords</h2>
                        {passArray.length === 0 && <div className='text-md font-bold text-white'>No Password to display</div>}
                        {passArray.length !== 0 && <div className='flex flex-col justify-center items-center mx-5 md:mx-0'><table className="table-auto text-white w-full rounded-md overflow-hidden bg-violet-950">
                            <thead className='bg-violet-700'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm md:text-md'>
                                {passArray.map((item) => {
                                    return <tr key={item.id}>
                                        <td className='py-2 text-center'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <a href="">{item.site}</a>
                                                <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className="flex justify-center items-center gap-2">
                                                {item.username}
                                                <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <div className="flex justify-center items-center gap-2">
                                                {"*".repeat(item.password.length)}
                                                <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='flex py-5 justify-center items-center gap-1 md:gap-3'>

                                            <span onClick={() => { editPass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/nwfpiryp.json"
                                                    trigger="hover"
                                                    colors="primary:#8930e8,secondary:#8930e8,tertiary:#ffffff,quaternary:#ffffff"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { deletePass(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table></div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
