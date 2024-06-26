import { Button } from "./Button";

interface Props {
  onNavigate: (prev?: boolean) => void;
}

export const Footer = ({ onNavigate }: Props) => (
  <div className="flex items-center">
    <Button onClick={() => onNavigate(true)} prev />
    <Button onClick={() => onNavigate()} />
  </div>
);
