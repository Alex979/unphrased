import HeaderTemplate from "../header-template";

export default function AboutPage() {
  return (
    <HeaderTemplate>
      <div className="p-8 w-full max-w-5xl mx-auto leading-relaxed">
        <p>
          Hello! I'm Alex, a full-stack developer with a passion for creating
          fun and engaging experiences through code. Welcome to Unphrased, a
          daily puzzle game I built inspired by my love for word games like
          Wordle and NYT Connections.
        </p>
        <br />
        <p>
          I've always seen programming as a form of artistic expression. To me,
          coding is not just about solving problems but also about creating
          something that can bring joy to others. That's exactly what I aim to
          do with Unphrased.
        </p>
        <br />
        <p>
          Whether you're a puzzle enthusiast or just looking for a fun way to
          challenge your brain each day, I hope Unphrased brings a little bit of
          joy to your daily routine.
        </p>
        <br />
        <p>
          If you have any feedback or inquiries, feel free to reach out to me at{" "}
          <a href="mailto:alexbroaddus1@gmail.com" className="text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold">
            alexbroaddus1@gmail.com
          </a>
        </p>
        <br />
      </div>
    </HeaderTemplate>
  );
}
