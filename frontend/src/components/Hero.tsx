const Hero = () => {
  return (
    <div className="bg-emerald-200 min-h-[500px] px-40 py-10 items-center justify-center">
        <h2 className="text-4xl font-bold font-sans">Get recruited for next dream job</h2>
        <p className="font-sans text-justify text-xl/7 py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio illum deleniti, eaque quisquam atque corporis sequi sapiente doloribus eligendi at distinctio corrupti, perspiciatis consequatur accusamus ipsa voluptatem ex cum ducimus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur fugiat cumque perspiciatis magni iusto. Aliquam voluptatum laborum incidunt quidem asperiores atque eligendi voluptate quibusdam distinctio, necessitatibus blanditiis ad totam vero!
          </p>
        <div className="flex gap-4">
          <button className="bg-slate-500 text-white px-4 my-5 rounded-md hover:bg-blue-600 transition duration-300 ">Hire Talent</button>
          <button className="bg-slate-500 text-white px-4 my-5 rounded-md hover:bg-blue-600 transition duration-300 ">Get Recruited</button>
        </div>
    </div>
  )
}

export default Hero