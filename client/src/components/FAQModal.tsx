import { useState } from 'react';
import { Modal, Button, Stack, Text, Accordion } from '@mantine/core';
import { Book2 } from 'tabler-icons-react';

export default function FAQModal() {
  
  const [opened, setOpened] = useState(false);


  return (
    <>
    
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Frequently asked questions."
      >

        <Accordion variant="contained" radius="md" defaultValue="whenRecord">
            <Accordion.Item value="whenRecord">
              <Accordion.Control>
              <Text style={{fontWeight: "bold"}}>
                  When should I create records in my ambitions?
              </Text>
              </Accordion.Control>
              <Accordion.Panel>
              It is suggested you create a record after you wake up each day. 
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="createRecord">
              <Accordion.Control>
              <Text style={{fontWeight: "bold"}}>
                  Why did the Create Record button disappear in my ambitions?
              </Text>
              </Accordion.Control>
              <Accordion.Panel>
              You can only enter one record per day on each of your ambitions. You can create a record again on each ambition the following day.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="search">
              <Accordion.Control>
                  <Text style={{fontWeight: "bold"}}>
                      What is Search showing?
                  </Text>
              </Accordion.Control>
              <Accordion.Panel>
              Search is showing ambitions that have been made public by its users. To make your ambitions visible in Search, go to Ego and update your selected Ambition to make it public.
                  </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="ego">
              <Accordion.Control>
              <Text style={{fontWeight: "bold"}}>
                  What is ??? ego/ambition?
              </Text>
              </Accordion.Control>
              <Accordion.Panel>
                For those who want an ego or ambition to choose but is not listed. If you choose ??? then it is suggested you write what your ego or ambition is in you daily plan to remember.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
        

        <Button mt="md" fullWidth variant='outline' color='orange' onClick={() => setOpened(false)}>Close</Button>
      </Modal>
    
      
      <Button leftIcon={<Book2 size={24} strokeWidth={2} color={'#40bfb2'}/>} radius="lg" fullWidth variant="outline" color="cyan" onClick={() => setOpened(true)}>FAQ</Button>
    </>
  );
}
