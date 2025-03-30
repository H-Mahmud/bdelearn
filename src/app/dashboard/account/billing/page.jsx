import Grid from '@mui/material/Unstable_Grid2';

import { _userPlans, _userCards, _userInvoices, _userAddressBook } from 'src/_mock';

import { AccountBillingPlan } from './account-billing-plan';
import { AccountBillingPayment } from './account-billing-payment';
import { AccountBillingHistory } from './account-billing-history';
import { AccountBillingAddress } from './account-billing-address';

// ----------------------------------------------------------------------

export default function AccountBilling() {
  return (
    <Grid container spacing={5} disableEqualOverflow>
      <Grid xs={12} md={8}>
        <AccountBillingPlan plans={_userPlans} cardList={_userCards} addressBook={_userCards} />

        <AccountBillingPayment cards={_userCards} />

        <AccountBillingAddress addressBook={_userAddressBook} />
      </Grid>

      <Grid xs={12} md={4}>
        <AccountBillingHistory invoices={_userInvoices} />
      </Grid>
    </Grid>
  );
}
