import { productionProjects } from "@/utils/data/projects-data";
import Link from "next/link";
import Reveal from "../../reveal";

function ProductionWork() {
  return (
    <section id="production-work" className="py-20 sm:py-28">
      <Reveal>
        <p className="kicker">Selected production work</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Real products. Real users. Real-world constraints.
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-3 text-muted text-sm sm:text-base max-w-xl">
          A selection of production applications I&apos;ve contributed to
          professionally. Where projects belong to companies or clients, the
          descriptions reflect my actual contribution.
        </p>
      </Reveal>

      <div className="mt-14 space-y-20">
        {productionProjects.map((project, i) => (
          <Reveal key={project.number} delay={0.1}>
            <article className="group">
              {/* Project number + label row */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-muted-2 tabular-nums">
                  {project.number}
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-2">
                  {project.label}
                </span>
              </div>

              {/* Project name */}
              <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                {project.name}
              </h3>

              {/* Description */}
              <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                {project.description}
              </p>

              {/* Contribution */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-2 mb-1.5">
                  My contribution
                </p>
                <p className="text-sm text-ink leading-relaxed max-w-xl">
                  {project.contribution}
                </p>
              </div>

              {/* Tools */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium text-muted bg-bg-soft px-2.5 py-1 rounded"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {project.website && (
                <div className="mt-6">
                  <Link
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-ink hover:text-accent transition-colors no-underline group/link"
                  >
                    Visit website
                    <span className="ml-1 transition-transform group-hover/link:translate-x-0.5">
                      ↗
                    </span>
                  </Link>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default ProductionWork;
