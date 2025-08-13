# @rozenite/firebase

Firebase Analytics, Firestore & Auth debugging for React Native DevTools.

## Installation

```bash
npm install @rozenite/firebase
```

## Quick Start

### 1. Add the Provider to your app

```tsx
import { FirebaseProvider } from '@rozenite/firebase';

export default function App() {
  return <FirebaseProvider>{/* Your app content */}</FirebaseProvider>;
}
```

### 2. Use Firebase hooks in your components

```tsx
import { useFirebase } from '@rozenite/firebase';

function MyComponent() {
  const { logEvent, logScreenView, setUserProperty } = useFirebase();

  const handleButtonPress = () => {
    logEvent('button_click', { button: 'test' });
  };

  const handleScreenView = () => {
    logScreenView('home_screen', 'HomeScreen');
  };

  const handleUserProperty = () => {
    setUserProperty('user_type', 'premium');
  };

  return (
    <View>
      <Button onPress={handleButtonPress} title="Log Event" />
      <Button onPress={handleScreenView} title="Log Screen View" />
      <Button onPress={handleUserProperty} title="Set User Property" />
    </View>
  );
}
```

### 3. View events in React Native DevTools

Open React Native DevTools and you'll see a "Firebase Analytics" panel showing all your Firebase events in real-time.

## Features

- ✅ **Zero Configuration** - Just install and wrap your app
- ✅ **Real-time Events** - See Firebase events as they happen
- ✅ **Analytics Support** - Track custom events, screen views, user properties
- ✅ **DevTools Integration** - Beautiful UI in React Native DevTools
- ✅ **TypeScript Support** - Full type safety

## API

### `FirebaseProvider`

Wraps your app to enable Firebase debugging.

### `useFirebase()`

Hook that provides Firebase debugging functions.

#### `logEvent(name: string, parameters?: Record<string, any>)`

Log a custom analytics event.

#### `logScreenView(screenName: string, screenClass?: string)`

Log a screen view event.

#### `setUserProperty(name: string, value: string)`

Set a user property.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT
