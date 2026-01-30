const Contact = () => {
  return (
        <div className="px-20 py-10 text-center">
            <h2 className=" text-2xl font-bold ">Contact Us</h2>
            <p>If you have any questions, feel free to reach out!</p>

            <div className="flex justify-center items-center">
            <form className="flex flex-col gap-4 mt-5 max-w-md items-center justify-center">
                <input type="text" placeholder="Name" className="p-2 border border-gray-300 rounded-md w-[40rem] required"/>
                <input type="text" placeholder="Company Name(optional)" className="p-2 border border-gray-300 rounded-md w-[40rem]"/>
                <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded-md w-[40rem] required"/>
                <textarea placeholder="Message" className="p-2 border border-gray-300 rounded-md w-[40rem] h-[10rem] required"></textarea>
                <button type="submit" className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition duration-300">Submit</button>
            </form>
            </div>
        </div>
   
  )
}

export default Contact
