import "../styles/SuccessStories.css";

const stories = [
  {
    quote: "I launched my first startup within 2 months of the conference.",
    name: "Tunde A.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    quote: "The mentorship was the missing link for my founder journey.",
    name: "Ama Chukwu",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
  {
    quote: "I left with a real roadmap to scale a profitable business.",
    name: "Olu K.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  },
];

export default function SuccessStories() {
  return (
    <section className="stories" id="past-events">
      <div className="stories__header">
        <p className="stories__eyebrow">Success Stories</p>
        <h2>Founders who started here are changing their world.</h2>
      </div>
      <div className="stories__grid">
        {stories.map((story) => (
          <article key={story.name} className="stories__card">
            <img src={story.image} alt={story.name} />
            <q>{story.quote}</q>
            <strong>{story.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
