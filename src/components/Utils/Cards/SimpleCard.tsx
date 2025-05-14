import { Card, CardContent, CardHeader, type CardProps } from "@mui/material";
import { type ReactNode } from "react";

interface SimpleCardProps extends CardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}
export default function SimpleCard(props: SimpleCardProps) {
  const { ...otherprops } = props;
  return (
    <Card variant="outlined" sx={{borderRadius: 0}} {...otherprops}>
      <CardHeader title={props.title} action={props.action} />
      {/* <Divider /> */}
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
