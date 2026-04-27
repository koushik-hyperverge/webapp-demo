import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@koushik-hyperverge/scaffold-ui';

export function App(): JSX.Element {
  return (
    <main className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>webapp-demo</CardTitle>
          <CardDescription>
            Built on @koushik-hyperverge/scaffold-ui. Owned by team platform-team.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </CardContent>
      </Card>
    </main>
  );
}
