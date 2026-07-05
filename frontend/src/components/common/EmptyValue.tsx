type Props = {
  value?: string | null;
};

export default function EmptyValue({ value }: Props) {
  return <span>{value && value.trim() ? value : '-'}</span>;
}

