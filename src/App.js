import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Visualizer from './components/Visualizer';

function App() {
  const [arr, setArr] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [sorting, setSorting] = useState(false);

  const generateArr = formState => {
    setGenerating(true);
    setTimeout(() => {
      let newArr = [];
      while (newArr.length <= formState.size) {
        let random = Math.floor(Math.random() * (200 - 10) + 10);
        if (newArr.indexOf(random) === -1) newArr.push(random);
      }
      setArr([...newArr]);
      setGenerating(false);
    }, 500);
  };
  useEffect(() => {
    generateArr({ size: 10 });
  }, []);

  const sort = () => {
    setSorting(true);
    setTimeout(() => {
      let newArr = [...arr];
      for (let i = 0; i < arr.length - 1; i++) {
        setTimeout(() => {
          for (let j = i + 1; j < arr.length; j++) {
            if (newArr[i] > newArr[j]) {
              let temp = newArr[i];
              newArr[i] = newArr[j];
              newArr[j] = temp;

              let newStep = [...newArr];

              setTimeout(() => {
                setArr([...newStep]);
              }, j * 100);
            }
            if (i === arr.length - 2) setSorting(false);
          }
        }, i * 1000);
      }
    }, 500);
  };
  return (
    <Box p={'4'}>
      <Flex gap={'4'}>
        <Sidebar
          generating={generating}
          sorting={sorting}
          generateArr={generateArr}
          sort={sort}
        />
        <Visualizer data={arr} />
      </Flex>
    </Box>
  );
}

export default App;
