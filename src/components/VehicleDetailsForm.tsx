import React from 'react';
import { 
  TextInput, 
  Select, 
  Radio, 
  Group, 
  Grid, 
  Text, 
  Container, 
  Paper, 
  Textarea,
  ActionIcon,
  Divider,
  Stack,
  Button,
  Table,
  ThemeIcon
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { 
  IconUserPlus, 
  IconCar, 
  IconFileText, 
  IconCreditCard, 
  IconUser, 
  IconReceipt2,
  IconMessageDots
} from '@tabler/icons-react';

// Configuration for dependent dropdowns
type VehicleCategoryData = {
  [category: string]: {
    makes: string[];
    models: { [make: string]: string[] };
    subcategories?: string[];
  };
};

const VEHICLE_DATA: VehicleCategoryData = {
  'Two Wheeler': {
    makes: ['Hero', 'Honda', 'TVS', 'Bajaj'],
    models: {
      'Hero': ['Splendor Plus', 'HF Deluxe', 'XPulse 200'],
      'Honda': ['Activa 6G', 'CB Shine', 'Dio'],
      'TVS': ['Apache RTR', 'Jupiter', 'Ntorq 125'],
      'Bajaj': ['Pulsar 150', 'Platina 100', 'Dominar 400']
    }
  },
  'Private Car': {
    makes: ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra'],
    models: {
      'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Ertiga'],
      'Hyundai': ['i20', 'Creta', 'Verna', 'Venue'],
      'Tata': ['Nexon', 'Punch', 'Harrier', 'Altroz'],
      'Mahindra': ['XUV700', 'Thar', 'Scorpio-N']
    }
  },
  'Goods Carrier': {
    subcategories: ['Upto 3500', '3501 to 7500', '7501 to 12000', 'Above 12000'],
    makes: ['Tata', 'Ashok Leyland', 'Mahindra', 'Eicher'],
    models: { 
        'Tata': ['Ace Gold', 'Intra V30', '407 Gold SFC'], 
        'Ashok Leyland': ['Dost+', 'Bada Dost'], 
        'Mahindra': ['Jeeto', 'Supro', 'Bolero Pik-Up'],
        'Eicher': ['Pro 2049', 'Pro 3015']
    }
  },
  'Passenger Carrier': {
    subcategories: ['1 to 6 Passengers', '7 to 12 Passengers', '13 to 30 Passengers', 'Above 30 Passengers'],
    makes: ['Tata', 'Force Motors', 'Ashok Leyland', 'Mahindra'],
    models: {
        'Tata': ['Winger', 'Magic', 'Starbus'],
        'Force Motors': ['Traveller 26', 'Urbania', 'Cruiser'],
        'Ashok Leyland': ['MiTR', 'Oyster'],
        'Mahindra': ['Cruzio', 'Tourister Excel']
    }
  }
};

const VehicleDetailsForm = () => {
  const form = useForm({
    initialValues: {
      vehicleType: 'RENEWAL', // Default to Renewal as per latest SS
      vehicleCategory: '',
      vehicleSubcategory: '',
      carrier: 'PUBLIC',
      make: '',
      model: '',
      fuelType: '',
      variant: '',
      cubicCapacity: '',
      seats: '',
      regNoType: 'Non-BH',
      regNoCity: 'AP02 - Anantapur',
      regNoCode: '',
      zone: 'B',
      regDate: null,
      mfgMonth: '',
      mfgYear: '',
      engineNo: '',
      chassisNo: '',
      vehicleColor: '',
      numberOfTire: '',
      prevPolicy: 'NO',
      insurerName: '',
      policyType: '',
      policyNumber: '',
      policyIssueDate: null,
      policyStartDate: null,
      policyEndDate: null,
      financed: 'No',
      // Premium Details
      liabilityPremium: '0',
      netPremium: '0',
      gstCess: '0',
      finalPremium: '0.00',
      // Insured Details
      familyGroup: '',
      memberName: '',
      customerType: 'Individual',
      title: 'Mr.',
      fullName: '',
      mobileNumber: '',
      email: '',
      dob: null,
      address: '',
      pincode: '',
      city: '',
      state: '',
      nomineeName: '',
      nomineeDob: null,
      nomineeRelationship: '',
      // Commission Details
      brokerAgency: '',
      subAgent: '',
      // Receivable
      receivableType: 'Percentage',
      recOdBasicPercent: '0',
      recOdBonusPercent: '0',
      recOdBasicValue: '0',
      recOdBonusValue: '0',
      recOdTotal: '0.00',
      recTpBasicPercent: '0',
      recTpBonusPercent: '0',
      recTpBasicValue: '0',
      recTpBonusValue: '0',
      recTpTotal: '0.00',
      recNetBasicPercent: '0',
      recNetBonusPercent: '0',
      recNetBasicValue: '0',
      recNetBonusValue: '0',
      recNetTotal: '0.00',
      recTotalBasic: '0.00',
      recTotalBonus: '0.00',
      recFinalReceivable: '0.00',
      // Payable
      payableType: 'Percentage',
      payOdBasicPercent: '0',
      payOdBonusPercent: '0',
      payOdBasicValue: '0',
      payOdBonusValue: '0',
      payOdTotal: '0.00',
      payTpBasicPercent: '0',
      payTpBonusPercent: '0',
      payTpBasicValue: '0',
      payTpBonusValue: '0',
      payTpTotal: '0.00',
      payNetBasicPercent: '0',
      payNetBonusPercent: '0',
      payNetBasicValue: '0',
      payNetBonusValue: '0',
      payNetTotal: '0.00',
      payTotalBasic: '0.00',
      payTotalBonus: '0.00',
      payFinalPayable: '0.00',
      // Payment & Remark
      paymentStatus: 'Online',
      remark: ''
    },
  });

  // Dynamic Logic
  const isGoodsCarrier = form.values.vehicleCategory === 'Goods Carrier';
  const isPassengerCarrier = form.values.vehicleCategory === 'Passenger Carrier';
  const hasSubcategory = isGoodsCarrier || isPassengerCarrier;
  
  const availableMakes = form.values.vehicleCategory ? VEHICLE_DATA[form.values.vehicleCategory]?.makes : [];
  const availableModels = (form.values.vehicleCategory && form.values.make) 
    ? VEHICLE_DATA[form.values.vehicleCategory]?.models[form.values.make] 
    : [];

  return (
    <Container size="xl" py="lg">
      <form onSubmit={form.onSubmit((values) => console.log("Final Data:", values))}>
        <Stack gap="lg">
          <Paper withBorder p="lg" radius="md" shadow="sm">
            <Group mb="sm">
              <ThemeIcon variant="light" size="lg" radius="md">
                <IconCar size="1.2rem" />
              </ThemeIcon>
              <Text size="md" fw={700} color="#2c3e50">Vehicle Details</Text>
            </Group>
            <Divider mb="lg" />

            <Grid gutter="md">
            
            {/* Row 1 */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Radio.Group
                label="Type of Vehicle"
                withAsterisk
                {...form.getInputProps('vehicleType')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              >
                <Group mt="xs">
                  <Radio value="NEW" label="NEW" size="xs" />
                  <Radio value="RENEWAL" label="RENEWAL / ROLLOVER" size="xs" />
                </Group>
              </Radio.Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Vehicle Category"
                placeholder="Select category"
                withAsterisk
                data={Object.keys(VEHICLE_DATA)}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                {...form.getInputProps('vehicleCategory')}
                onChange={(value) => {
                    form.setFieldValue('vehicleCategory', value);
                    form.setFieldValue('make', ''); 
                    form.setFieldValue('model', '');
                    form.setFieldValue('vehicleSubcategory', '');
                }}
              />
            </Grid.Col>

            {/* Conditional Subcategory */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              {hasSubcategory && (
                <Select
                  label="Vehicle Subcategory"
                  placeholder="Select subcategory"
                  data={VEHICLE_DATA[form.values.vehicleCategory].subcategories}
                  styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                  {...form.getInputProps('vehicleSubcategory')}
                />
              )}
            </Grid.Col>

            {/* Conditional Carrier */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              {hasSubcategory && (
                <Radio.Group
                    label="Carrier"
                    {...form.getInputProps('carrier')}
                    styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                >
                    <Group mt="xs">
                        <Radio value="PUBLIC" label="PUBLIC" size="xs" />
                        <Radio value="PRIVATE" label="PRIVATE" size="xs" />
                    </Group>
                </Radio.Group>
              )}
            </Grid.Col>

            {/* Make */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Make"
                placeholder={form.values.vehicleCategory ? "Select Make" : "Choose Category First"}
                disabled={!form.values.vehicleCategory}
                withAsterisk
                data={availableMakes}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                {...form.getInputProps('make')}
                onChange={(value) => {
                    form.setFieldValue('make', value);
                    form.setFieldValue('model', '');
                }}
              />
            </Grid.Col>

            {/* Model */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Model"
                placeholder={form.values.make ? "Select Model" : "Choose Make First"}
                disabled={!form.values.make}
                withAsterisk
                data={availableModels}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                {...form.getInputProps('model')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Fuel Type"
                placeholder="Select Fuel Type"
                withAsterisk
                data={['Petrol', 'Diesel', 'CNG', 'Electric', 'CNG/LPG']}
                {...form.getInputProps('fuelType')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Variant (Sub-Model)"
                placeholder="Select Variant"
                withAsterisk
                data={['Standard', 'LXI', 'VXI', 'ZXI']}
                {...form.getInputProps('variant')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Cubic Capacity / GVW"
                withAsterisk
                {...form.getInputProps('cubicCapacity')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Seat (incl. Driver)"
                withAsterisk
                {...form.getInputProps('seats')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Registration No. */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Group justify="space-between" mb={3}>
                    <Text size="sm" fw={600} color="#495057" style={{ fontSize: '13px' }}>Registration No. <span style={{color: 'red'}}>*</span></Text>
                    <Text size="sm" color="blue.6" fw={700} style={{ textTransform: 'uppercase' }}>
                        {form.values.regNoCity ? form.values.regNoCity.split('')[0] + form.values.regNoCity.split('')[1] + form.values.regNoCity.split('')[2] + form.values.regNoCity.split('')[3] : ''}{form.values.regNoCode || ''}
                    </Text>
                </Group>
                <div style={{ display: 'flex' }}>
                    <Select 
                        data={['Non-BH', 'BH']} 
                        {...form.getInputProps('regNoType')}
                        styles={{ 
                            input: { 
                                borderTopRightRadius: 0, 
                                borderBottomRightRadius: 0, 
                                backgroundColor: 'white', 
                                width: '100px',
                                borderRight: 'none'
                            } 
                        }}
                    />
                    <Select 
                        placeholder="Select RTO"
                        data={['AP02', 'KA01', 'KA02']} 
                        {...form.getInputProps('regNoCity')}
                        styles={{ 
                            input: { 
                                borderRadius: 0, 
                                backgroundColor: '#f8f9fa', 
                                fontSize: '13px',
                                width: '90px',
                                color: '#adb5bd'
                            } 
                        }}
                    />
                    <TextInput 
                        placeholder="NEWW"
                        {...form.getInputProps('regNoCode')}
                        style={{ flex: 1 }}
                        styles={{ 
                            input: { 
                                borderTopLeftRadius: 0, 
                                borderBottomLeftRadius: 0,
                                borderLeft: 'none',
                                backgroundColor: 'white'
                            } 
                        }}
                    />
                </div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Zone"
                {...form.getInputProps('zone')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <DateInput
                label="Reg. Date"
                placeholder="mm/dd/yyyy"
                {...form.getInputProps('regDate')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="MFG Month"
                {...form.getInputProps('mfgMonth')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="MFG Year"
                {...form.getInputProps('mfgYear')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row with Engine and Chassis No */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Engine No."
                placeholder="atleast last 6 characters"
                {...form.getInputProps('engineNo')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Chassis No."
                placeholder="atleast last 6 characters"
                {...form.getInputProps('chassisNo')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Vehicle Color"
                {...form.getInputProps('vehicleColor')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Number Of Tire"
                {...form.getInputProps('numberOfTire')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
                <Radio.Group
                    label="Previous Policy Available"
                    withAsterisk
                    {...form.getInputProps('prevPolicy')}
                    styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
                >
                    <Stack mt="xs" gap="xs">
                        <Radio value="YES" label="YES" size="xs" />
                        <Radio value="NO" label="NO" size="xs" />
                    </Stack>
                </Radio.Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="green">
              <IconFileText size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">New Policy Details</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="md">
            {/* Row 1 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Insurer Name"
                placeholder="Select Insurer"
                withAsterisk
                data={['TATA AIG', 'ICICI Lombard', 'HDFC Ergo', 'Bajaj Allianz']}
                {...form.getInputProps('insurerName')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Policy Type"
                placeholder="Select Policy Type"
                withAsterisk
                data={['Comprehensive', 'Third Party', 'Own Damage', 'Nil Depreciation']}
                {...form.getInputProps('policyType')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Policy Number"
                withAsterisk
                {...form.getInputProps('policyNumber')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Policy Issue Date"
                placeholder="mm/dd/yyyy"
                withAsterisk
                {...form.getInputProps('policyIssueDate')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row 2 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Policy Start Date"
                placeholder="mm/dd/yyyy"
                withAsterisk
                {...form.getInputProps('policyStartDate')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Policy End Date"
                placeholder="mm/dd/yyyy"
                withAsterisk
                {...form.getInputProps('policyEndDate')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12 }}>
              <Radio.Group
                  label="Financed"
                  {...form.getInputProps('financed')}
                  styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              >
                  <Group mt="xs">
                      <Radio value="Yes" label="Yes" size="xs" />
                      <Radio value="No" label="No" size="xs" />
                  </Group>
                </Radio.Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="orange">
              <IconCreditCard size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Premium Details</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Liability (TP) Premium"
                {...form.getInputProps('liabilityPremium')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Net Premium"
                {...form.getInputProps('netPremium')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="GST & CESS"
                {...form.getInputProps('gstCess')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Final Premium"
                {...form.getInputProps('finalPremium')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="grape">
              <IconUser size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Insured Details</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="md">
            {/* Row 1 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Group justify="space-between" mb={3}>
                  <Text size="sm" fw={600} color="#495057" style={{ fontSize: '13px' }}>Family Group</Text>
                  <ActionIcon variant="light" color="blue" size="sm" radius="xs">
                    <IconUserPlus size="1rem" />
                  </ActionIcon>
              </Group>
              <Select
                placeholder="Select Family Group"
                data={['Family 1', 'Family 2']}
                {...form.getInputProps('familyGroup')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Group justify="space-between" mb={3}>
                  <Text size="sm" fw={600} color="#495057" style={{ fontSize: '13px' }}>Member Name</Text>
                  <ActionIcon variant="light" color="blue" size="sm" radius="xs">
                    <IconUserPlus size="1rem" />
                  </ActionIcon>
              </Group>
              <Select
                placeholder="Select Member"
                data={['Member 1', 'Member 2']}
                {...form.getInputProps('memberName')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Radio.Group
                  label="Customer Type"
                  {...form.getInputProps('customerType')}
                  styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              >
                  <Stack mt="xs" gap="xs">
                      <Radio value="Individual" label="Individual" size="xs" />
                      <Radio value="Company" label="Company" size="xs" />
                  </Stack>
              </Radio.Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Select
                label="Title"
                data={['Mr.', 'Mrs.', 'Ms.', 'Dr.']}
                {...form.getInputProps('title')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row 2 */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Full Name"
                withAsterisk
                {...form.getInputProps('fullName')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Mobile Number"
                {...form.getInputProps('mobileNumber')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <TextInput
                label="Email"
                {...form.getInputProps('email')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateInput
                label="Date of Birth"
                placeholder="mm/dd/yyyy"
                {...form.getInputProps('dob')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row 3 Address */}
            <Grid.Col span={{ base: 12, md: 12 }}>
              <Textarea
                label="Address"
                minRows={2}
                {...form.getInputProps('address')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row 4 */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Pincode"
                {...form.getInputProps('pincode')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="City / District"
                {...form.getInputProps('city')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="State"
                {...form.getInputProps('state')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            {/* Row 5 Nominee */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="Nominee Name"
                {...form.getInputProps('nomineeName')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <DateInput
                label="Nominee DOB"
                placeholder="mm/dd/yyyy"
                {...form.getInputProps('nomineeDob')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Nominee Relationship"
                placeholder="Select Nominee Relationship"
                data={['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister']}
                {...form.getInputProps('nomineeRelationship')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="blue">
              <IconReceipt2 size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Commission Details</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="xl">
            {/* Row 1 */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group justify="space-between" mb={3}>
                  <Text size="sm" fw={600} color="#495057" style={{ fontSize: '13px' }}>Broker / Agency</Text>
                  <ActionIcon variant="light" color="blue" size="sm" radius="xs">
                    <IconUserPlus size="1rem" />
                  </ActionIcon>
              </Group>
              <Select
                placeholder="Select Broker / Agency"
                data={['Broker 1', 'Broker 2']}
                {...form.getInputProps('brokerAgency')}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group justify="space-between" mb={3}>
                  <Text size="sm" fw={600} color="#495057" style={{ fontSize: '13px' }}>Sub Agent</Text>
                  <ActionIcon variant="light" color="blue" size="sm" radius="xs">
                    <IconUserPlus size="1rem" />
                  </ActionIcon>
              </Group>
              <Select
                placeholder="Select Sub Agent"
                data={['Sub Agent 1', 'Sub Agent 2']}
                {...form.getInputProps('subAgent')}
              />
            </Grid.Col>

            {/* Row 2: Two Panels side by side */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="sm" radius="sm">
                  <Text size="sm" fw={500} color="dimmed" mb="sm">Commission Receivable</Text>
                  <Divider mb="sm" />
                  
                  <Radio.Group
                      mb="md"
                      {...form.getInputProps('receivableType')}
                  >
                      <Stack mt="xs" gap="xs">
                          <Radio value="Percentage" label="Percentage" size="xs" />
                          <Radio value="Flat" label="Flat" size="xs" />
                      </Stack>
                  </Radio.Group>

                  <Table horizontalSpacing="xs" verticalSpacing="xs" style={{ fontSize: '13px' }}>
                    <thead>
                        <tr>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Premium</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Basic</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Bonus</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Basic Value</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Bonus Value</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>OD</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recOdBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recOdBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recOdBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recOdBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('recOdTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>TP</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recTpBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recTpBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recTpBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recTpBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('recTpTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>Net</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recNetBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('recNetBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recNetBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('recNetBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('recNetTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#343a40' }}>Final Receivable</td>
                            <td colSpan={2}></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Total Basic</Text><TextInput readOnly {...form.getInputProps('recTotalBasic')} size="xs" /></Stack></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Total Bonus</Text><TextInput readOnly {...form.getInputProps('recTotalBonus')} size="xs" /></Stack></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Final Receivable</Text><TextInput readOnly {...form.getInputProps('recFinalReceivable')} size="xs" /></Stack></td>
                        </tr>
                    </tbody>
                  </Table>
                </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="sm" radius="sm">
                  <Text size="sm" fw={500} color="dimmed" mb="sm">Commission Payable</Text>
                  <Divider mb="sm" />
                  
                  <Radio.Group
                      mb="md"
                      {...form.getInputProps('payableType')}
                  >
                      <Stack mt="xs" gap="xs">
                          <Radio value="Percentage" label="Percentage" size="xs" />
                          <Radio value="Flat" label="Flat" size="xs" />
                      </Stack>
                  </Radio.Group>

                  <Table horizontalSpacing="xs" verticalSpacing="xs" style={{ fontSize: '13px' }}>
                    <thead>
                        <tr>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Premium</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Basic</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Bonus</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Basic Value</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Bonus Value</th>
                        <th style={{ color: '#868e96', fontWeight: 500 }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>OD</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payOdBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payOdBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payOdBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payOdBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('payOdTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>TP</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payTpBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payTpBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payTpBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payTpBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('payTpTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#495057' }}>Net</td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payNetBasicPercent')} size="xs" /></td>
                            <td><TextInput rightSection={<Text size="xs" color="dimmed">%</Text>} {...form.getInputProps('payNetBonusPercent')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payNetBasicValue')} size="xs" /></td>
                            <td><TextInput {...form.getInputProps('payNetBonusValue')} size="xs" /></td>
                            <td><TextInput readOnly {...form.getInputProps('payNetTotal')} size="xs" /></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600, color: '#343a40' }}>Final Payable</td>
                            <td colSpan={2}></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Total Basic</Text><TextInput readOnly {...form.getInputProps('payTotalBasic')} size="xs" /></Stack></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Total Bonus</Text><TextInput readOnly {...form.getInputProps('payTotalBonus')} size="xs" /></Stack></td>
                            <td><Stack gap={0}><Text size="xs" fw={600}>Final Payable</Text><TextInput readOnly {...form.getInputProps('payFinalPayable')} size="xs" /></Stack></td>
                        </tr>
                    </tbody>
                  </Table>
                </Paper>
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
              <IconCreditCard size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Payment Details</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="xl">
            <Grid.Col span={12}>
              <Radio.Group
                  label="Payment Status"
                  withAsterisk
                  {...form.getInputProps('paymentStatus')}
                  styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              >
                  <Stack mt="xs" gap="xs">
                      <Radio value="Online" label="Online" size="xs" />
                      <Radio value="Credit" label="Credit" size="xs" />
                      <Radio value="Cash" label="Cash" size="xs" />
                      <Radio value="Cut & Pay" label="Cut & Pay" size="xs" />
                      <Radio value="Cheque" label="Cheque" size="xs" />
                  </Stack>
              </Radio.Group>
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper withBorder p="lg" radius="md" shadow="sm">
          <Group mb="sm">
            <ThemeIcon variant="light" size="lg" radius="md" color="cyan">
              <IconMessageDots size="1.2rem" />
            </ThemeIcon>
            <Text size="md" fw={700} color="#2c3e50">Remark</Text>
          </Group>
          <Divider mb="lg" />

          <Grid gutter="xl">
            <Grid.Col span={12}>
              <Textarea
                label="Remark"
                minRows={3}
                {...form.getInputProps('remark')}
                styles={{ label: { color: '#495057', fontWeight: 600, fontSize: '13px' } }}
              />
            </Grid.Col>
          </Grid>
        </Paper>
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button type="submit" size="md" radius="md">
            Submit Vehicle Details
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default VehicleDetailsForm;