type Props = {
  title: string;
  description: string;
};

export default function ErrorState({ title, description }: Props) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

