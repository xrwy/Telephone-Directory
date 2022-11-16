import TelephoneDirectoryProvider from './context/TelephoneDirectoryProvider';
import Container from './components/Container/Container';

function App() {
  return (
    <TelephoneDirectoryProvider>
      <Container />
    </TelephoneDirectoryProvider>
  );
}

export default App;
