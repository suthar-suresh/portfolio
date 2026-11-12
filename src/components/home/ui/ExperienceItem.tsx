import type { IExperienceItem } from "@/types";
import Column from "@/components/core/Column";
import BulletedText from "@/components/common/bulleted-text";

const ExperienceItem = ({ data }: { data: IExperienceItem }) => {
  return (
    <Column classNames="justify-between w-full h-full gap-2">
      <Column classNames="justify-start">
        <p className="text-lg/6 font-semibold">{data.designation}</p>

        <p className="text-[var(--textColorLight)] text-base/6 font-medium">
          {data.company}
          {data.employmentType && ` · ${data.employmentType}`}
        </p>
        {(data.location || data.workplaceType) && (
          <p className="text-sm/6 text-[var(--textColorLight)]">
            {[data.location, data.workplaceType].filter(Boolean).join(" · ")}
          </p>
        )}
      </Column>

      {(data.description.length > 0 || data.skills?.length) && (
        <div className="w-full flex flex-col gap-2 relative mt-0 md:mt-8">
          {data.description.map((desc, i) => (
            <BulletedText key={`exp-desc-${i}`}>
              <p className="text-base/6 font-normal">{desc}</p>
            </BulletedText>
          ))}
          {data.skills && (
            <p className="text-sm/6 font-medium break-words">
              Skills: {data.skills.join(", ")}
            </p>
          )}
        </div>
      )}
    </Column>
  );
};

export default ExperienceItem;
