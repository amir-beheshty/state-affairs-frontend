export default function Chip({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  let classes = ['inline-block', 'px-3', 'py-1', 'text-sm', 'text-gray-600'];
  const primaryClasses = ['bg-gray-100', 'rounded-full'];
  const secondaryClasses = ['bg-gray-200', 'rounded-md'];
  if (primary) {
    classes = classes.concat(primaryClasses);
  } else {
    classes = classes.concat(secondaryClasses);
  }

  return <div className={classes.join(' ')}>{children}</div>;
}
