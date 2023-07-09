import Image from "next/image";

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
    <section>
      <div className=" max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            About MedCare Finder
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="h-64 overflow-hidden sm:h-80 lg:h-full">
            <Image
              src="/medcare-about.jpeg"
              alt="Medical Doctor"
              width={500}
              height={500}
              className="h-full w-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
          <div className="lg:py-16 bg-gray-dark-one rounded-md p-2">
            <div className="space-y-4 text-gray-light">
              <p>
                MedCare Finder is a platform that helps you find the best
                hospitals and medical centers near you.
              </p>
              <p>
                We provide you with the best hospitals and medical centers in
                your area, so you can make an informed decision on where to go
                for your medical needs.
              </p>
              <p>
                We also provide you with the contact details of the hospitals
                and medical centers, so you can easily reach out to them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
