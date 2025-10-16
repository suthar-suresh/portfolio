import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Column from "@/components/core/Column";
import ConstrainedBox from "@/components/core/constrained-box";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import Row from "@/components/core/Row";
import { FlipWords } from "@/components/common/FlipWords";
import ParticleBackground from "@/components/common/ParticleBackground";
import socialLinks from "@/data/socialLinks";
import TalkButton from "./ui/TalkButton";

const HomeSection1 = ({ id }: Readonly<{ id: string }>) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--bgColor)] bg-[var(--bgColor)] min-h-screen items-center justify-center relative overflow-hidden rounded-md"
      id={id}
    >
      <ParticleBackground />
      <ConstrainedBox classNames="px-4 py-8 pt-16 z-20 items-center justify-center">
        <Column classNames="w-full items-center justify-center">

          {/* Main Heading */}
          <div className="inline-flex items-center">
            <h1 className="text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--textColor)] text-[var(--textColor)] font-bold text-center">
              Hi there, I am{" "}
              <FlipWords
                words={["Suresh Suthar", "@sksuthar."]}
                className="text-2xl/normal sm:text-3xl/normal md:text-5xl/normal lg:text-6xl/normal xl:text-7xl/normal dark:text-[var(--primaryColor)] text-[var(--primaryColor)] font-bold text-center"
              />
            </h1>
          </div>

          {/* Subheading */}
          <h2 className="text-sm/normal md:text-base/normal dark:text-[var(--textColorLight)] text-[var(--textColorLight)] mt-4 text-center">
            Full Stack Developer 💻 SDE 🛠️ Open Source 🌍
          </h2>

          {/* CTA Button */}
          <div className="gap-4 mt-12 lg:mt-16 flex flex-col md:flex-row">
            <TalkButton />
          </div>
        </Column>

        {/* Social Links */}
        <div className="mt-12 lg:mt-16 w-full flex flex-col items-center">
          <h2 className="text-base/6 font-medium text-center">Follow me here</h2>

          <Row classNames="mt-2 gap-2">
            {socialLinks.slice(0, 5).map((link) => {
              return (
                <Link
                  key={`social-link-${link.name || link.text}`}
                  href={link.url}
                  target="_blank"
                  className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
                  aria-label={`${link.name}`}
                >
                  <span className="text-base/6 text-[var(--whiteColor)]">
                    {typeof link.icon === "string" ? null : (
                      <FontAwesomeIcon icon={link.icon} />
                    )}
                  </span>
                </Link>
              );
            })}
          </Row>
        </div>
      </ConstrainedBox>
    </ResponsiveBox>
  );
};

export default HomeSection1;
