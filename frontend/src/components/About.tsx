const About = () => {
  return (
    <section className="px-20 py-10">
      <h2 className="text-2xl font-bold">How we do it..</h2>

      <div className="flex flex-col gap-20 mt-5 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start gap-10">
          <h3 className="text-xl font-semibold sm:w-1/3">
            Headhunting and Sourcing
          </h3>
          <p className="flex-1 text-gray-700 leading-relaxed ">
            We are dedicated to finding the best talent for our clients. Our
            team works tirelessly to identify, attract and match top candidates
            who are a perfect fit for your organization from all over the world.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-10">
          <h3 className="text-xl font-semibold sm:w-1/3">Industry Focus</h3>
          <p className="flex-1 text-gray-700 leading-relaxed">
            We specialize in various industries, including technology, finance,
            healthcare, and more. Our team has the expertise to understand the
            unique challenges and requirements of each sector, allowing us to
            find the best candidates for your specific needs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-10">
          <h3 className="text-xl font-semibold sm:w-1/3">Soft Skills Focus</h3>
          <p className="flex-1 text-gray-700 leading-relaxed">
            We believe that soft skills are just as important as technical
            skills. Our recruitment process assesses candidates' communication,
            teamwork, and problem-solving abilities to ensure they can thrive in
            your organization.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About