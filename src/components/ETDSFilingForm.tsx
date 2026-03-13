import React from 'react';
import {
  TextInput,
  Select,
  Group,
  Grid,
  Text,
  Paper,
  Divider,
  NumberInput,
  Stack,
  ThemeIcon,
  Button,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconFileText,
  IconBuildingBank,
  IconUsers,
  IconCheck,
} from '@tabler/icons-react';

const labelStyle = { label: { color: '#495057', fontWeight: 600, fontSize: '13px' } };

interface FormValues {
  tanNumber: string;
  panOfDeductor: string;
  financialYear: string;
  quarter: string;
  formType: string;
  bsrCode: string;
  dateOfDeposit: Date | null;
  challanSerial: string;
  tdsAmount: number;
  interest: number;
  fees: number;
  deducteePan: string;
  sectionCode: string;
  paymentDate: Date | null;
  amountPaid: number;
}

interface ETDSFilingFormProps {
  onSubmitSuccess?: (values: FormValues) => void;
}

export const ETDSFilingForm = ({ onSubmitSuccess }: ETDSFilingFormProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      tanNumber: '',
      panOfDeductor: '',
      financialYear: '2025-26',
      quarter: 'Q4',
      formType: '26Q',
      bsrCode: '',
      dateOfDeposit: null,
      challanSerial: '',
      tdsAmount: 0,
      interest: 0,
      fees: 0,
      deducteePan: '',
      sectionCode: '',
      paymentDate: null,
      amountPaid: 0,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmitSuccess?.(values);
    notifications.show({
      title: 'e-TDS Filed Successfully',
      message: 'Your e-TDS details have been submitted.',
      color: 'teal',
      icon: <IconCheck size="1.1rem" />,
      autoClose: 4000,
    });
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg" p="sm">

        {/* General Information */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="blue">
              <IconFileText size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">General Information</Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="TAN of Deductor"
                placeholder="KOLM12345P"
                withAsterisk
                {...form.getInputProps('tanNumber')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Form Type"
                data={['24Q (Salary)', '26Q (Non-Salary)', '27Q (Non-Resident)']}
                {...form.getInputProps('formType')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Financial Year"
                data={['2024-25', '2025-26']}
                {...form.getInputProps('financialYear')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Quarter"
                data={['Q1', 'Q2', 'Q3', 'Q4']}
                {...form.getInputProps('quarter')}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Challan Details */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="orange">
              <IconBuildingBank size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Challan Details (Payment to Bank)</Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="BSR Code"
                placeholder="7-digit code"
                {...form.getInputProps('bsrCode')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Date of Deposit"
                placeholder="mm/dd/yyyy"
                {...form.getInputProps('dateOfDeposit')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Challan Serial No."
                placeholder="5-digit serial"
                {...form.getInputProps('challanSerial')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <NumberInput
                label="Total TDS Paid"
                hideControls
                {...form.getInputProps('tdsAmount')}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Deductee Details */}
        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="green">
              <IconUsers size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Deductee Details (Annexure I)</Text>
          </Group>
          <Divider mb="lg" />
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="PAN of Deductee"
                placeholder="ABCDE1234F"
                withAsterisk
                {...form.getInputProps('deducteePan')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Section Code"
                placeholder="Select Section"
                data={['192', '194C (Contract)', '194J (Prof)', '194I (Rent)']}
                {...form.getInputProps('sectionCode')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <NumberInput
                label="Amount Paid / Credited"
                hideControls
                {...form.getInputProps('amountPaid')}
                styles={labelStyle}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Date of Payment"
                placeholder="mm/dd/yyyy"
                {...form.getInputProps('paymentDate')}
                styles={labelStyle}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Group justify="flex-end">
          <Button variant="outline" color="gray" radius="md">Reset Form</Button>
          <Button type="submit" radius="md">Validate & Generate FVU</Button>
        </Group>

      </Stack>
    </form>
  );
};