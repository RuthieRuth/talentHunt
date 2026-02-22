import devOps from "../assets/devOps.jpg";
import frontend from "../assets/frontend.png";
import UIUX from "../assets/UIUX.jpg";

const Roles = () => {
  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold mb-5">Roles we recruit for </h1>
      <div className="flex gap-5 items-center justify-center ">
        <div className="card bg-base-100 w-80 shadow-sm">
          <figure className="m-0">
            <img src={frontend} alt="frontend" className="w-full h-48 object-cover"/>
          </figure>
          <div className="collapse collapse-arrow border-0">
            <input
              type="checkbox"
              className="peer"
              aria-label="Toggle Role 1"
            />
            <div className="collapse-title text-lg font-medium">
              Software Engineering
            </div>
            <div className="collapse-content">
              <ul className="list-disc pl-6 marker:text-red-600 space-y-1">
                <li className="text">Frontend Developer</li>
                <li className="text">Backend Developer</li>
                <li className="text">Full Stack Developer</li>
                <li className="text">Mobile Apps</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-80 w-80 shadow-sm">
          <figure>
           <img src={devOps} alt="DevOps" className="w-full h-48 object-cover"/>
          </figure>
          <div className="collapse collapse-arrow border-0">
            <input
              type="checkbox"
              className="peer"
              aria-label="Toggle Role 1"
            />
            <div className="collapse-title text-lg font-medium">DevOps</div>
            <div className="collapse-content">
              <ul className="list-disc pl-6 marker:text-red-600 space-y-1">
                <li className="text">AWS Specialist</li>
                <li className="text">Azure Experts</li>
                <li className="text">Google Cloud Professionals</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-80 w-80 shadow-sm">
          <figure>
            <img src={UIUX} alt="UIUX" className="w-full h-48 object-cover"/>
          </figure>
          <div className="collapse collapse-arrow border-0">
            <input
              type="checkbox"
              className="peer"
              aria-label="Toggle Role 1"
            />
            <div className="collapse-title text-lg font-medium">
              Product Design
            </div>
            <div className="collapse-content">
              <ul className="list-disc pl-6 marker:text-red-600 space-y-1">
                <li className="text">UI/UX Designer</li>
                <li className="text">Visual Designer</li>
                <li className="text">Graphic Designer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Roles;