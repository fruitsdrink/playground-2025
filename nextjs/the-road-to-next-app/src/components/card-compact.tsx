import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardCompactProps = {
  title: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};
export function CardCompact({
  title,
  description,
  content,
  footer,
  className,
}: CardCompactProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
