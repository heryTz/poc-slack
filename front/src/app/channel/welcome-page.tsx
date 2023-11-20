import { Text } from "src/components/text";

export function WelcomePage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-sm text-center">
        <Text>Veuillez choisir un canal pour démarrer.</Text>
      </div>
    </div>
  );
}
