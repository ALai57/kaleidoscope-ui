import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { NavBar } from '../components/layout/NavBar';
import { useKeycloak } from '../auth/useKeycloak';
import { getDomainAvailability, newPaymentSecret } from '../api/payments';
import type { DomainAvailability, PaymentIntent } from '../api/payments';

// ── Stripe setup ───────────────────────────────────────────────────────────

const stripePublishableKey = import.meta.env['VITE_STRIPE_PUBLISHABLE_KEY'] ?? '';
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// ── Domain selector step ───────────────────────────────────────────────────

interface DomainSelectorProps {
  domainAvailability: DomainAvailability | null;
  onCheck: (domain: string) => void;
  onNext: () => void;
  isChecking: boolean;
}

const DomainSelector: React.FC<DomainSelectorProps> = ({
  domainAvailability,
  onCheck,
  onNext,
  isChecking,
}) => {
  const [domain, setDomain] = useState(domainAvailability?.domain ?? '');

  return (
    <Paper elevation={10}>
      <Grid container alignItems="center" sx={{ p: '10px' }}>
        <Grid item xs={6}>
          <TextField
            size="small"
            variant="outlined"
            value={domain}
            label="Domain name"
            sx={{ mr: '15px' }}
            onChange={(e) => setDomain(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sx={{ pb: '10px' }}>
          <Button
            variant="contained"
            onClick={() => onCheck(domain)}
            disabled={isChecking || !domain}
          >
            {domainAvailability == null || domain !== domainAvailability.domain
              ? 'Check availability'
              : 'Re-check availability'}
          </Button>
        </Grid>
      </Grid>

      {domainAvailability !== null && (
        <Grid container alignItems="center" sx={{ p: '10px' }}>
          <Grid item xs={2}>
            {domainAvailability.available ? (
              <Tooltip title={`Domain \`${domainAvailability.domain}\` is available`}>
                <CheckBoxIcon sx={{ color: 'green', fontSize: 60 }} />
              </Tooltip>
            ) : (
              <Tooltip title={`Domain \`${domainAvailability.domain}\` is not available`}>
                <WarningAmberIcon sx={{ color: 'red', fontSize: 60 }} />
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              disabled={!domainAvailability.available}
              onClick={onNext}
              data-testid="purchase-button"
            >
              {`Purchase ${domainAvailability.domain}`}
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

// ── Stripe payment form ────────────────────────────────────────────────────

interface PaymentFormProps {
  clientSecret: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret: _ }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const here = window.location.origin;
    await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${here}/completed` },
    });
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <AddressElement options={{ mode: 'billing' }} />
      <PaymentElement />
      <br />
      <Button
        type="submit"
        variant="contained"
        disabled={!stripe || !elements}
      >
        Submit Payment
      </Button>
    </form>
  );
};

// ── Payment step ───────────────────────────────────────────────────────────

interface PaymentWidgetProps {
  domainAvailability: DomainAvailability | null;
  paymentIntent: PaymentIntent | null;
}

const PaymentWidget: React.FC<PaymentWidgetProps> = ({ domainAvailability, paymentIntent }) => {
  if (paymentIntent && stripePromise) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: paymentIntent.client_secret, loader: 'always' }}
      >
        <Box sx={{ p: 2 }}>
          <Paper elevation={10} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h4">Invoice</Typography>
            <Typography>
              ${(paymentIntent.amount / 100).toFixed(2)} for{' '}
              {domainAvailability?.domain ?? 'domain'}
            </Typography>
          </Paper>

          <Paper elevation={10} sx={{ p: 2 }}>
            <Typography variant="h4">Payment</Typography>
            <PaymentForm clientSecret={paymentIntent.client_secret} />
          </Paper>
        </Box>
      </Elements>
    );
  }

  if (domainAvailability?.available) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Typography variant="h6">Loading payment details…</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return null;
};

// ── Page ───────────────────────────────────────────────────────────────────

const SignUpPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();
  const [activeStep, setActiveStep] = useState(0);
  const [domainToCheck, setDomainToCheck] = useState<string | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
      }
    : undefined;

  // Domain availability query
  const { data: domainAvailability = null, isFetching: isCheckingDomain } = useQuery({
    queryKey: ['domain-availability', domainToCheck],
    queryFn: () => getDomainAvailability(domainToCheck!, token),
    enabled: domainToCheck !== null,
  });

  // Generate payment intent mutation
  const paymentMutation = useMutation({
    mutationFn: () =>
      newPaymentSecret({ amount: 1400, currency: 'usd' }, token),
  });

  const handleNextStep = () => {
    setActiveStep(1);
    paymentMutation.mutate();
  };

  const steps = [
    {
      label: 'Select a domain name',
      caption: (
        <Typography variant="caption">
          For recent top level domain name market prices refer to{' '}
          <a
            href="https://d32ze2gidvkk54.cloudfront.net/Amazon_Route_53_Domain_Registration_Pricing_20140731.pdf"
            target="_blank"
            rel="noreferrer"
          >
            this AWS document.
          </a>
        </Typography>
      ),
      content: (
        <DomainSelector
          domainAvailability={domainAvailability}
          onCheck={(d) => setDomainToCheck(d)}
          onNext={handleNextStep}
          isChecking={isCheckingDomain}
        />
      ),
    },
    {
      label: 'Payment',
      caption: (
        <Typography variant="caption">
          All payment processing is handled by{' '}
          <a href="https://stripe.com" target="_blank" rel="noreferrer">
            Stripe
          </a>
        </Typography>
      ),
      content: (
        <PaymentWidget
          domainAvailability={domainAvailability}
          paymentIntent={paymentMutation.data ?? null}
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Grid container alignItems="center" justifyContent="center" sx={{ p: 3 }}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map(({ label, caption, content }) => (
              <Step key={label}>
                <StepLabel optional={caption}>{label}</StepLabel>
                <StepContent>
                  <Divider sx={{ mb: 1 }} />
                  {content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpPage;
