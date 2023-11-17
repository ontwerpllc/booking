create foreign data wrapper stripe_wrapper
  handler stripe_fdw_handler
  validator stripe_fdw_validator;

create server stripe_server
  foreign data wrapper stripe_wrapper
  options (
    api_key 'sk_test_51NvLrnKgpZaXVVNFl5bxc51Vwo6LDEqP4EMBOJEFbvXfTHEUSZg2Syj6Yjkix3c5Md9oYGXWtm95RAAdvdyVZFZl00VtIbuIxU'  -- Stripe API key, required
  );

create schema stripe;

create foreign table stripe.accounts (
  id text,
  business_type text,
  country text,
  email text,
  type text,
  created timestamp,
  attrs jsonb
)
  server stripe_server
  options (
    object 'accounts'
  );

create foreign table stripe.customers (
  id text,
  email text,
  name text,
  description text,
  created timestamp,
  attrs jsonb
)
  server stripe_server
  options (
    object 'customers',
    rowid_column 'id'
  );

create foreign table stripe.products (
  id text,
  name text,
  active bool,
  default_price text,
  description text,
  created timestamp,
  updated timestamp,
  attrs jsonb
)
  server stripe_server
  options (
    object 'products',
    rowid_column 'id'
  );

create foreign table stripe.subscriptions (
  id text,
  customer text,
  currency text,
  current_period_start timestamp,
  current_period_end timestamp,
  attrs jsonb
)
  server stripe_server
  options (
    object 'subscriptions',
    rowid_column 'id'
  );
