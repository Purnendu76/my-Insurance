import { Box, Button, Flex, Modal, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import HealthBasicDetails from '../../components/HeatlthDetailsForm';

export const Health = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box p="md">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="lg" wrap="wrap" gap="md">
        <Title order={3} c="blue.6" style={{ letterSpacing: '0.5px' }}>HEALTH POLICIES</Title>
        <Button leftSection={<IconPlus size={16} />} color="green.8" onClick={open}>
          Add New
        </Button>
      </Flex>

      {/* Add Health Policy Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={700} size="lg">Add Health Policy</Text>}
        size="68%"
        centered
      >
        <HealthBasicDetails />
      </Modal>
    </Box>
  );
};
