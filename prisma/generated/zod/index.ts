import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','refresh_token_expires_in']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','country','state','email','emailVerified','image','zipCode','password','bio','isNewUser','role','onboardingStatus']);

export const VendorScalarFieldEnumSchema = z.enum(['id','businessName','description','availability','category','images','averageRating','totalRatings','userId']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id','identifier','token','expires']);

export const PasswordResetTokenScalarFieldEnumSchema = z.enum(['id','email','token','expires']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','name','price','pricingModel','embeddedLookupId','status','eventIDs','vendorId','tags','createdAt','updatedAt']);

export const ProductScalarFieldEnumSchema = z.enum(['id','name','description','price','isConsumable','onRent','pricingModel','embeddedLookupId','status','vendorId','images','createdAt','updatedAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','description','guestCount','type','startDate','endDate','totalPrice','completionRate','status','location','createdAt','updatedAt','customId','userId']);

export const EventServiceScalarFieldEnumSchema = z.enum(['id','status','eventId','serviceId','createdAt','updatedAt','conversationId']);

export const EventProductScalarFieldEnumSchema = z.enum(['id','eventId','productId']);

export const BookingScalarFieldEnumSchema = z.enum(['id','eventId','status','paymentId','createdAt','updatedAt']);

export const PaymentScalarFieldEnumSchema = z.enum(['id','amount','currency','status','paymentMethod','transactionId','createdAt','updatedAt']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt']);

export const MessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','text','senderId','status','attachment','conversationId']);

export const ServiceDiscountScalarFieldEnumSchema = z.enum(['id','type','threshold','discount','isPercentage','serviceId']);

export const RatingScalarFieldEnumSchema = z.enum(['id','rating','comment','createdAt','updatedAt','vendorId','userId']);

export const ReportScalarFieldEnumSchema = z.enum(['id','serviceId','vendorId','reporterId','issueType','description','status','attachments','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const OnboardingStatusSchema = z.enum(['NOT_STARTED','STEP_1','STEP_2','STEP_3','COMPLETED']);

export type OnboardingStatusType = `${z.infer<typeof OnboardingStatusSchema>}`

export const PricingModelSchema = z.enum(['FIXED_PRICE','HOURLY_RATE','PER_PERSON']);

export type PricingModelType = `${z.infer<typeof PricingModelSchema>}`

export const ServiceBookingStatusSchema = z.enum(['PENDING','ACCEPTED','REJECTED','COMPLETED']);

export type ServiceBookingStatusType = `${z.infer<typeof ServiceBookingStatusSchema>}`

export const MessageStatusEnumSchema = z.enum(['SENT','DELIVERED','READ']);

export type MessageStatusEnumType = `${z.infer<typeof MessageStatusEnumSchema>}`

export const BookingStatusEnumSchema = z.enum(['PENDING','CONFIRMED','CANCELLED']);

export type BookingStatusEnumType = `${z.infer<typeof BookingStatusEnumSchema>}`

export const PaymentStatusEnumSchema = z.enum(['PENDING','COMPLETED','FAILED','REFUNDED']);

export type PaymentStatusEnumType = `${z.infer<typeof PaymentStatusEnumSchema>}`

export const VendorCategorySchema = z.enum(['HALLS','DECORATORS_FLORISTS','ENTERTAINMENT','LIGHTING_AV','TABLES_CHAIRS_TENTS','LOGISTICS_TRANSPORTATION','BRANDING_STATIONERIES','BAKERS','BAR_SERVICES','SECURITY_SERVICES','FURNITURE_LOUNGE_RENTALS','MAKEUP_HAIR','EVENT_TECH','CATERERS']);

export type VendorCategoryType = `${z.infer<typeof VendorCategorySchema>}`

export const MemberStatusEnumSchema = z.enum(['ACTIVE','INACTIVE','PENDING']);

export type MemberStatusEnumType = `${z.infer<typeof MemberStatusEnumSchema>}`

export const EventStatusEnumSchema = z.enum(['COMPLETED','PENDING','ONGOING','DISPUTED','TEMP']);

export type EventStatusEnumType = `${z.infer<typeof EventStatusEnumSchema>}`

export const RolesSchema = z.enum(['ADMIN','VENDOR','USER']);

export type RolesType = `${z.infer<typeof RolesSchema>}`

export const PublishStatusSchema = z.enum(['DRAFT','PUBLIC','PRIVATE','SCHEDULED','ARCHIVED']);

export type PublishStatusType = `${z.infer<typeof PublishStatusSchema>}`

export const DiscountTypeSchema = z.enum(['BULK_QUANTITY','PRICE_THRESHOLD','DURATION','FLAT_RATE']);

export type DiscountTypeType = `${z.infer<typeof DiscountTypeSchema>}`

export const ReportIssueTypeSchema = z.enum(['FRAUD','IMPERSONATION','ABUSE','OTHER']);

export type ReportIssueTypeType = `${z.infer<typeof ReportIssueTypeSchema>}`

export const ReportStatusSchema = z.enum(['PENDING','INVESTIGATING','RESOLVED','DISMISSED']);

export type ReportStatusType = `${z.infer<typeof ReportStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  refresh_token_expires_in: z.number().int().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RolesSchema,
  onboardingStatus: OnboardingStatusSchema,
  id: z.string(),
  name: z.string().nullable(),
  country: z.string().nullable(),
  state: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  zipCode: z.string().nullable(),
  password: z.string().nullable(),
  bio: z.string().nullable(),
  isNewUser: z.boolean().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VENDOR SCHEMA
/////////////////////////////////////////

export const VendorSchema = z.object({
  category: VendorCategorySchema.nullable(),
  id: z.string(),
  businessName: z.string().nullable(),
  description: z.string().nullable(),
  availability: JsonValueSchema.nullable(),
  images: z.string().array(),
  averageRating: z.number().nullable(),
  totalRatings: z.number().int().nullable(),
  userId: z.string(),
})

export type Vendor = z.infer<typeof VendorSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// PASSWORD RESET TOKEN SCHEMA
/////////////////////////////////////////

export const PasswordResetTokenSchema = z.object({
  id: z.string(),
  email: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type PasswordResetToken = z.infer<typeof PasswordResetTokenSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  pricingModel: PricingModelSchema,
  status: PublishStatusSchema,
  id: z.string(),
  name: z.string(),
  price: z.number(),
  embeddedLookupId: z.string(),
  eventIDs: z.string().array(),
  vendorId: z.string(),
  tags: z.string().array(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  pricingModel: PricingModelSchema,
  status: PublishStatusSchema,
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  isConsumable: z.boolean().nullable(),
  onRent: z.boolean().nullable(),
  embeddedLookupId: z.string(),
  vendorId: z.string(),
  images: z.string().array(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  status: EventStatusEnumSchema,
  id: z.string(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().nullable(),
  type: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  totalPrice: z.number().nullable(),
  completionRate: z.number().int().nullable(),
  location: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  customId: z.string().nullable(),
  userId: z.string(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT SERVICE SCHEMA
/////////////////////////////////////////

export const EventServiceSchema = z.object({
  status: ServiceBookingStatusSchema,
  id: z.string(),
  eventId: z.string(),
  serviceId: z.string(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  conversationId: z.string().nullable(),
})

export type EventService = z.infer<typeof EventServiceSchema>

/////////////////////////////////////////
// EVENT PRODUCT SCHEMA
/////////////////////////////////////////

export const EventProductSchema = z.object({
  id: z.string(),
  eventId: z.string().nullable(),
  productId: z.string(),
})

export type EventProduct = z.infer<typeof EventProductSchema>

/////////////////////////////////////////
// BOOKING SCHEMA
/////////////////////////////////////////

export const BookingSchema = z.object({
  status: BookingStatusEnumSchema,
  id: z.string(),
  eventId: z.string(),
  paymentId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Booking = z.infer<typeof BookingSchema>

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  status: PaymentStatusEnumSchema,
  id: z.string(),
  amount: z.number(),
  currency: z.string(),
  paymentMethod: z.string(),
  transactionId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Payment = z.infer<typeof PaymentSchema>

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  status: MessageStatusEnumSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  text: z.string(),
  senderId: z.string(),
  attachment: JsonValueSchema.nullable(),
  conversationId: z.string(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// SERVICE DISCOUNT SCHEMA
/////////////////////////////////////////

export const ServiceDiscountSchema = z.object({
  type: DiscountTypeSchema,
  id: z.string(),
  threshold: z.number().nullable(),
  discount: z.number(),
  isPercentage: z.boolean(),
  serviceId: z.string(),
})

export type ServiceDiscount = z.infer<typeof ServiceDiscountSchema>

/////////////////////////////////////////
// RATING SCHEMA
/////////////////////////////////////////

export const RatingSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  vendorId: z.string(),
  userId: z.string(),
})

export type Rating = z.infer<typeof RatingSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  issueType: ReportIssueTypeSchema,
  status: ReportStatusSchema,
  id: z.string(),
  serviceId: z.string(),
  vendorId: z.string(),
  reporterId: z.string(),
  description: z.string(),
  attachments: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  refresh_token_expires_in: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  events: z.boolean().optional(),
  ratings: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  country: z.boolean().optional(),
  state: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  password: z.boolean().optional(),
  bio: z.boolean().optional(),
  isNewUser: z.boolean().optional(),
  role: z.boolean().optional(),
  onboardingStatus: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
  ratings: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VENDOR
//------------------------------------------------------

export const VendorIncludeSchema: z.ZodType<Prisma.VendorInclude> = z.object({
}).strict()

export const VendorArgsSchema: z.ZodType<Prisma.VendorDefaultArgs> = z.object({
  select: z.lazy(() => VendorSelectSchema).optional(),
  include: z.lazy(() => VendorIncludeSchema).optional(),
}).strict();

export const VendorCountOutputTypeArgsSchema: z.ZodType<Prisma.VendorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VendorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VendorCountOutputTypeSelectSchema: z.ZodType<Prisma.VendorCountOutputTypeSelect> = z.object({
  services: z.boolean().optional(),
  products: z.boolean().optional(),
  ratings: z.boolean().optional(),
}).strict();

export const VendorSelectSchema: z.ZodType<Prisma.VendorSelect> = z.object({
  id: z.boolean().optional(),
  businessName: z.boolean().optional(),
  description: z.boolean().optional(),
  availability: z.boolean().optional(),
  category: z.boolean().optional(),
  images: z.boolean().optional(),
  averageRating: z.boolean().optional(),
  totalRatings: z.boolean().optional(),
  userId: z.boolean().optional(),
  services: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  ratings: z.union([z.boolean(),z.lazy(() => RatingArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenArgsSchema: z.ZodType<Prisma.VerificationTokenDefaultArgs> = z.object({
  select: z.lazy(() => VerificationTokenSelectSchema).optional(),
}).strict();

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// PASSWORD RESET TOKEN
//------------------------------------------------------

export const PasswordResetTokenArgsSchema: z.ZodType<Prisma.PasswordResetTokenDefaultArgs> = z.object({
  select: z.lazy(() => PasswordResetTokenSelectSchema).optional(),
}).strict();

export const PasswordResetTokenSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceDefaultArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  eventService: z.boolean().optional(),
  discounts: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  pricingModel: z.boolean().optional(),
  embeddedLookupId: z.boolean().optional(),
  status: z.boolean().optional(),
  eventIDs: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
  eventService: z.union([z.boolean(),z.lazy(() => EventServiceArgsSchema)]).optional(),
  discounts: z.union([z.boolean(),z.lazy(() => ServiceDiscountArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  eventProduct: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  isConsumable: z.boolean().optional(),
  onRent: z.boolean().optional(),
  pricingModel: z.boolean().optional(),
  embeddedLookupId: z.boolean().optional(),
  status: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  images: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
  eventProduct: z.union([z.boolean(),z.lazy(() => EventProductArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  bookings: z.boolean().optional(),
  eventService: z.boolean().optional(),
  eventProduct: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  guestCount: z.boolean().optional(),
  type: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  totalPrice: z.boolean().optional(),
  completionRate: z.boolean().optional(),
  status: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  customId: z.boolean().optional(),
  userId: z.boolean().optional(),
  bookings: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
  eventService: z.union([z.boolean(),z.lazy(() => EventServiceArgsSchema)]).optional(),
  eventProduct: z.union([z.boolean(),z.lazy(() => EventProductArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT SERVICE
//------------------------------------------------------

export const EventServiceIncludeSchema: z.ZodType<Prisma.EventServiceInclude> = z.object({
}).strict()

export const EventServiceArgsSchema: z.ZodType<Prisma.EventServiceDefaultArgs> = z.object({
  select: z.lazy(() => EventServiceSelectSchema).optional(),
  include: z.lazy(() => EventServiceIncludeSchema).optional(),
}).strict();

export const EventServiceSelectSchema: z.ZodType<Prisma.EventServiceSelect> = z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  eventId: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()

// EVENT PRODUCT
//------------------------------------------------------

export const EventProductIncludeSchema: z.ZodType<Prisma.EventProductInclude> = z.object({
}).strict()

export const EventProductArgsSchema: z.ZodType<Prisma.EventProductDefaultArgs> = z.object({
  select: z.lazy(() => EventProductSelectSchema).optional(),
  include: z.lazy(() => EventProductIncludeSchema).optional(),
}).strict();

export const EventProductSelectSchema: z.ZodType<Prisma.EventProductSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  productId: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
}).strict()

// BOOKING
//------------------------------------------------------

export const BookingIncludeSchema: z.ZodType<Prisma.BookingInclude> = z.object({
}).strict()

export const BookingArgsSchema: z.ZodType<Prisma.BookingDefaultArgs> = z.object({
  select: z.lazy(() => BookingSelectSchema).optional(),
  include: z.lazy(() => BookingIncludeSchema).optional(),
}).strict();

export const BookingSelectSchema: z.ZodType<Prisma.BookingSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  status: z.boolean().optional(),
  paymentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
}).strict()

// PAYMENT
//------------------------------------------------------

export const PaymentIncludeSchema: z.ZodType<Prisma.PaymentInclude> = z.object({
}).strict()

export const PaymentArgsSchema: z.ZodType<Prisma.PaymentDefaultArgs> = z.object({
  select: z.lazy(() => PaymentSelectSchema).optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
}).strict();

export const PaymentSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
  id: z.boolean().optional(),
  amount: z.boolean().optional(),
  currency: z.boolean().optional(),
  status: z.boolean().optional(),
  paymentMethod: z.boolean().optional(),
  transactionId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  booking: z.union([z.boolean(),z.lazy(() => BookingArgsSchema)]).optional(),
}).strict()

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
}).strict()

export const ConversationArgsSchema: z.ZodType<Prisma.ConversationDefaultArgs> = z.object({
  select: z.lazy(() => ConversationSelectSchema).optional(),
  include: z.lazy(() => ConversationIncludeSchema).optional(),
}).strict();

export const ConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
  eventServices: z.boolean().optional(),
}).strict();

export const ConversationSelectSchema: z.ZodType<Prisma.ConversationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageArgsSchema)]).optional(),
  eventServices: z.union([z.boolean(),z.lazy(() => EventServiceArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  text: z.boolean().optional(),
  senderId: z.boolean().optional(),
  status: z.boolean().optional(),
  attachment: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()

// SERVICE DISCOUNT
//------------------------------------------------------

export const ServiceDiscountIncludeSchema: z.ZodType<Prisma.ServiceDiscountInclude> = z.object({
}).strict()

export const ServiceDiscountArgsSchema: z.ZodType<Prisma.ServiceDiscountDefaultArgs> = z.object({
  select: z.lazy(() => ServiceDiscountSelectSchema).optional(),
  include: z.lazy(() => ServiceDiscountIncludeSchema).optional(),
}).strict();

export const ServiceDiscountSelectSchema: z.ZodType<Prisma.ServiceDiscountSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  threshold: z.boolean().optional(),
  discount: z.boolean().optional(),
  isPercentage: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

// RATING
//------------------------------------------------------

export const RatingIncludeSchema: z.ZodType<Prisma.RatingInclude> = z.object({
}).strict()

export const RatingArgsSchema: z.ZodType<Prisma.RatingDefaultArgs> = z.object({
  select: z.lazy(() => RatingSelectSchema).optional(),
  include: z.lazy(() => RatingIncludeSchema).optional(),
}).strict();

export const RatingSelectSchema: z.ZodType<Prisma.RatingSelect> = z.object({
  id: z.boolean().optional(),
  rating: z.boolean().optional(),
  comment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  userId: z.boolean().optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportArgsSchema: z.ZodType<Prisma.ReportDefaultArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  reporterId: z.boolean().optional(),
  issueType: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  attachments: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isNewUser: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRolesFilterSchema),z.lazy(() => RolesSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => EnumOnboardingStatusFilterSchema),z.lazy(() => OnboardingStatusSchema) ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  vendor: z.union([ z.lazy(() => VendorNullableRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional().nullable(),
  ratings: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  isNewUser: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  onboardingStatus: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  ratings: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isNewUser: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRolesFilterSchema),z.lazy(() => RolesSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => EnumOnboardingStatusFilterSchema),z.lazy(() => OnboardingStatusSchema) ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  vendor: z.union([ z.lazy(() => VendorNullableRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional().nullable(),
  ratings: z.lazy(() => RatingListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  isNewUser: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  onboardingStatus: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isNewUser: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => EnumRolesWithAggregatesFilterSchema),z.lazy(() => RolesSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => EnumOnboardingStatusWithAggregatesFilterSchema),z.lazy(() => OnboardingStatusSchema) ]).optional(),
}).strict();

export const VendorWhereInputSchema: z.ZodType<Prisma.VendorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  availability: z.lazy(() => JsonNullableFilterSchema).optional(),
  category: z.union([ z.lazy(() => EnumVendorCategoryNullableFilterSchema),z.lazy(() => VendorCategorySchema) ]).optional().nullable(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  averageRating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalRatings: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  services: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  ratings: z.lazy(() => RatingListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const VendorOrderByWithRelationInputSchema: z.ZodType<Prisma.VendorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  services: z.lazy(() => ServiceOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  ratings: z.lazy(() => RatingOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const VendorWhereUniqueInputSchema: z.ZodType<Prisma.VendorWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  availability: z.lazy(() => JsonNullableFilterSchema).optional(),
  category: z.union([ z.lazy(() => EnumVendorCategoryNullableFilterSchema),z.lazy(() => VendorCategorySchema) ]).optional().nullable(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  averageRating: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  totalRatings: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  services: z.lazy(() => ServiceListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  ratings: z.lazy(() => RatingListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const VendorOrderByWithAggregationInputSchema: z.ZodType<Prisma.VendorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VendorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VendorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VendorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VendorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VendorSumOrderByAggregateInputSchema).optional()
}).strict();

export const VendorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VendorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  businessName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  availability: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  category: z.union([ z.lazy(() => EnumVendorCategoryNullableWithAggregatesFilterSchema),z.lazy(() => VendorCategorySchema) ]).optional().nullable(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  averageRating: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  totalRatings: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetTokenWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string(),
    email_token: z.lazy(() => PasswordResetTokenEmailTokenCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    token: z.string(),
  }),
  z.object({
    id: z.string(),
    email_token: z.lazy(() => PasswordResetTokenEmailTokenCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
    email_token: z.lazy(() => PasswordResetTokenEmailTokenCompoundUniqueInputSchema),
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    email_token: z.lazy(() => PasswordResetTokenEmailTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  email_token: z.lazy(() => PasswordResetTokenEmailTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenWhereInputSchema),z.lazy(() => PasswordResetTokenWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const PasswordResetTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const PasswordResetTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  eventIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  eventService: z.lazy(() => EventServiceListRelationFilterSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventIDs: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  eventService: z.lazy(() => EventServiceOrderByRelationAggregateInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  eventIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  eventService: z.lazy(() => EventServiceListRelationFilterSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountListRelationFilterSchema).optional()
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventIDs: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelWithAggregatesFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusWithAggregatesFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  eventIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  vendorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isConsumable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  onRent: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  eventProduct: z.lazy(() => EventProductListRelationFilterSchema).optional()
}).strict();

export const ProductOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isConsumable: z.lazy(() => SortOrderSchema).optional(),
  onRent: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isConsumable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  onRent: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  eventProduct: z.lazy(() => EventProductListRelationFilterSchema).optional()
}).strict());

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isConsumable: z.lazy(() => SortOrderSchema).optional(),
  onRent: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  isConsumable: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  onRent: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelWithAggregatesFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusWithAggregatesFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  vendorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guestCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  totalPrice: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  completionRate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumEventStatusEnumFilterSchema),z.lazy(() => EventStatusEnumSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookings: z.lazy(() => BookingListRelationFilterSchema).optional(),
  eventService: z.lazy(() => EventServiceListRelationFilterSchema).optional(),
  eventProduct: z.lazy(() => EventProductListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  customId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  bookings: z.lazy(() => BookingOrderByRelationAggregateInputSchema).optional(),
  eventService: z.lazy(() => EventServiceOrderByRelationAggregateInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guestCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  totalPrice: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  completionRate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumEventStatusEnumFilterSchema),z.lazy(() => EventStatusEnumSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bookings: z.lazy(() => BookingListRelationFilterSchema).optional(),
  eventService: z.lazy(() => EventServiceListRelationFilterSchema).optional(),
  eventProduct: z.lazy(() => EventProductListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  customId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  guestCount: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  totalPrice: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  completionRate: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumEventStatusEnumWithAggregatesFilterSchema),z.lazy(() => EventStatusEnumSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  customId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EventServiceWhereInputSchema: z.ZodType<Prisma.EventServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventServiceWhereInputSchema),z.lazy(() => EventServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventServiceWhereInputSchema),z.lazy(() => EventServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumServiceBookingStatusFilterSchema),z.lazy(() => ServiceBookingStatusSchema) ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  conversationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationNullableRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.EventServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const EventServiceWhereUniqueInputSchema: z.ZodType<Prisma.EventServiceWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    eventId_serviceId: z.lazy(() => EventServiceEventIdServiceIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    eventId_serviceId: z.lazy(() => EventServiceEventIdServiceIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  eventId_serviceId: z.lazy(() => EventServiceEventIdServiceIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EventServiceWhereInputSchema),z.lazy(() => EventServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventServiceWhereInputSchema),z.lazy(() => EventServiceWhereInputSchema).array() ]).optional(),
  status: z.union([ z.lazy(() => EnumServiceBookingStatusFilterSchema),z.lazy(() => ServiceBookingStatusSchema) ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  conversationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationNullableRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional().nullable(),
}).strict());

export const EventServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventServiceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventServiceMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => EventServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => EventServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumServiceBookingStatusWithAggregatesFilterSchema),z.lazy(() => ServiceBookingStatusSchema) ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  conversationId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EventProductWhereInputSchema: z.ZodType<Prisma.EventProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventProductWhereInputSchema),z.lazy(() => EventProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventProductWhereInputSchema),z.lazy(() => EventProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventNullableRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional().nullable(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict();

export const EventProductOrderByWithRelationInputSchema: z.ZodType<Prisma.EventProductOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputSchema).optional()
}).strict();

export const EventProductWhereUniqueInputSchema: z.ZodType<Prisma.EventProductWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    eventId_productId: z.lazy(() => EventProductEventIdProductIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    eventId_productId: z.lazy(() => EventProductEventIdProductIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  eventId_productId: z.lazy(() => EventProductEventIdProductIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EventProductWhereInputSchema),z.lazy(() => EventProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventProductWhereInputSchema),z.lazy(() => EventProductWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  event: z.union([ z.lazy(() => EventNullableRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional().nullable(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
}).strict());

export const EventProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventProductCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventProductMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventProductScalarWhereWithAggregatesInputSchema),z.lazy(() => EventProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventProductScalarWhereWithAggregatesInputSchema),z.lazy(() => EventProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const BookingWhereInputSchema: z.ZodType<Prisma.BookingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumBookingStatusEnumFilterSchema),z.lazy(() => BookingStatusEnumSchema) ]).optional(),
  paymentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional(),
}).strict();

export const BookingOrderByWithRelationInputSchema: z.ZodType<Prisma.BookingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  payment: z.lazy(() => PaymentOrderByWithRelationInputSchema).optional()
}).strict();

export const BookingWhereUniqueInputSchema: z.ZodType<Prisma.BookingWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    paymentId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    paymentId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  paymentId: z.string().optional(),
  AND: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingWhereInputSchema),z.lazy(() => BookingWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumBookingStatusEnumFilterSchema),z.lazy(() => BookingStatusEnumSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional(),
}).strict());

export const BookingOrderByWithAggregationInputSchema: z.ZodType<Prisma.BookingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BookingCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BookingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BookingMinOrderByAggregateInputSchema).optional()
}).strict();

export const BookingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BookingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingScalarWhereWithAggregatesInputSchema),z.lazy(() => BookingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumBookingStatusEnumWithAggregatesFilterSchema),z.lazy(() => BookingStatusEnumSchema) ]).optional(),
  paymentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PaymentWhereInputSchema: z.ZodType<Prisma.PaymentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusEnumFilterSchema),z.lazy(() => PaymentStatusEnumSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  booking: z.union([ z.lazy(() => BookingNullableRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PaymentOrderByWithRelationInputSchema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  booking: z.lazy(() => BookingOrderByWithRelationInputSchema).optional()
}).strict();

export const PaymentWhereUniqueInputSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusEnumFilterSchema),z.lazy(() => PaymentStatusEnumSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  booking: z.union([ z.lazy(() => BookingNullableRelationFilterSchema),z.lazy(() => BookingWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PaymentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PaymentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PaymentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PaymentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PaymentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PaymentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PaymentSumOrderByAggregateInputSchema).optional()
}).strict();

export const PaymentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PaymentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPaymentStatusEnumWithAggregatesFilterSchema),z.lazy(() => PaymentStatusEnumSchema) ]).optional(),
  paymentMethod: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  eventServices: z.lazy(() => EventServiceListRelationFilterSchema).optional()
}).strict();

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  eventServices: z.lazy(() => EventServiceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  eventServices: z.lazy(() => EventServiceListRelationFilterSchema).optional()
}).strict());

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumMessageStatusEnumFilterSchema),z.lazy(() => MessageStatusEnumSchema) ]).optional(),
  attachment: z.lazy(() => JsonNullableFilterSchema).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachment: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumMessageStatusEnumFilterSchema),z.lazy(() => MessageStatusEnumSchema) ]).optional(),
  attachment: z.lazy(() => JsonNullableFilterSchema).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachment: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumMessageStatusEnumWithAggregatesFilterSchema),z.lazy(() => MessageStatusEnumSchema) ]).optional(),
  attachment: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ServiceDiscountWhereInputSchema: z.ZodType<Prisma.ServiceDiscountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceDiscountWhereInputSchema),z.lazy(() => ServiceDiscountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceDiscountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceDiscountWhereInputSchema),z.lazy(() => ServiceDiscountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDiscountTypeFilterSchema),z.lazy(() => DiscountTypeSchema) ]).optional(),
  threshold: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  discount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPercentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceDiscountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional(),
  isPercentage: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional()
}).strict();

export const ServiceDiscountWhereUniqueInputSchema: z.ZodType<Prisma.ServiceDiscountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ServiceDiscountWhereInputSchema),z.lazy(() => ServiceDiscountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceDiscountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceDiscountWhereInputSchema),z.lazy(() => ServiceDiscountWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumDiscountTypeFilterSchema),z.lazy(() => DiscountTypeSchema) ]).optional(),
  threshold: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  discount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPercentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict());

export const ServiceDiscountOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceDiscountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional(),
  isPercentage: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceDiscountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceDiscountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceDiscountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceDiscountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceDiscountSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceDiscountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceDiscountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceDiscountScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceDiscountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceDiscountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceDiscountScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceDiscountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDiscountTypeWithAggregatesFilterSchema),z.lazy(() => DiscountTypeSchema) ]).optional(),
  threshold: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  discount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  isPercentage: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RatingWhereInputSchema: z.ZodType<Prisma.RatingWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const RatingOrderByWithRelationInputSchema: z.ZodType<Prisma.RatingOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const RatingWhereUniqueInputSchema: z.ZodType<Prisma.RatingWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    vendorId_userId: z.lazy(() => RatingVendorIdUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    vendorId_userId: z.lazy(() => RatingVendorIdUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  vendorId_userId: z.lazy(() => RatingVendorIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingWhereInputSchema),z.lazy(() => RatingWhereInputSchema).array() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const RatingOrderByWithAggregationInputSchema: z.ZodType<Prisma.RatingOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RatingCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RatingAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RatingMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RatingMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RatingSumOrderByAggregateInputSchema).optional()
}).strict();

export const RatingScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RatingScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereWithAggregatesInputSchema),z.lazy(() => RatingScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issueType: z.union([ z.lazy(() => EnumReportIssueTypeFilterSchema),z.lazy(() => ReportIssueTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  attachments: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  issueType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issueType: z.union([ z.lazy(() => EnumReportIssueTypeFilterSchema),z.lazy(() => ReportIssueTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  attachments: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  issueType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reporterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  issueType: z.union([ z.lazy(() => EnumReportIssueTypeWithAggregatesFilterSchema),z.lazy(() => ReportIssueTypeSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumReportStatusWithAggregatesFilterSchema),z.lazy(() => ReportStatusSchema) ]).optional(),
  attachments: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorCreateInputSchema: z.ZodType<Prisma.VendorCreateInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutVendorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVendorInputSchema)
}).strict();

export const VendorUncheckedCreateInputSchema: z.ZodType<Prisma.VendorUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  userId: z.string(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorUpdateInputSchema: z.ZodType<Prisma.VendorUpdateInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  services: z.lazy(() => ServiceUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutVendorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorCreateManyInputSchema: z.ZodType<Prisma.VendorCreateManyInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  userId: z.string()
}).strict();

export const VendorUpdateManyMutationInputSchema: z.ZodType<Prisma.VendorUpdateManyMutationInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VendorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateManyInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const PasswordResetTokenUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const PasswordResetTokenUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenCreateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const PasswordResetTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutServicesInputSchema),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutServiceInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.string(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutServiceInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutServicesNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutServiceNestedInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutServiceNestedInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.string(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutProductsInputSchema),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  vendorId: z.string(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  vendorId: z.string(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  bookings: z.lazy(() => BookingCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutEventInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEventsInputSchema)
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  userId: z.string(),
  bookings: z.lazy(() => BookingUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookings: z.lazy(() => BookingUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutEventNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => BookingUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventServiceCreateInputSchema: z.ZodType<Prisma.EventServiceCreateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventServiceInputSchema),
  service: z.lazy(() => ServiceCreateNestedOneWithoutEventServiceInputSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutEventServicesInputSchema).optional()
}).strict();

export const EventServiceUncheckedCreateInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const EventServiceUpdateInputSchema: z.ZodType<Prisma.EventServiceUpdateInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneWithoutEventServicesNestedInputSchema).optional()
}).strict();

export const EventServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceCreateManyInputSchema: z.ZodType<Prisma.EventServiceCreateManyInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const EventServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.EventServiceUpdateManyMutationInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventProductCreateInputSchema: z.ZodType<Prisma.EventProductCreateInput> = z.object({
  id: z.string().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventProductInputSchema).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutEventProductInputSchema)
}).strict();

export const EventProductUncheckedCreateInputSchema: z.ZodType<Prisma.EventProductUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  eventId: z.string().optional().nullable(),
  productId: z.string()
}).strict();

export const EventProductUpdateInputSchema: z.ZodType<Prisma.EventProductUpdateInput> = z.object({
  event: z.lazy(() => EventUpdateOneWithoutEventProductNestedInputSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutEventProductNestedInputSchema).optional()
}).strict();

export const EventProductUncheckedUpdateInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventProductCreateManyInputSchema: z.ZodType<Prisma.EventProductCreateManyInput> = z.object({
  id: z.string().optional(),
  eventId: z.string().optional().nullable(),
  productId: z.string()
}).strict();

export const EventProductUpdateManyMutationInputSchema: z.ZodType<Prisma.EventProductUpdateManyMutationInput> = z.object({
}).strict();

export const EventProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateManyInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateInputSchema: z.ZodType<Prisma.BookingCreateInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutBookingsInputSchema),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutBookingInputSchema)
}).strict();

export const BookingUncheckedCreateInputSchema: z.ZodType<Prisma.BookingUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  eventId: z.string(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  paymentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BookingUpdateInputSchema: z.ZodType<Prisma.BookingUpdateInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutBookingsNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneRequiredWithoutBookingNestedInputSchema).optional()
}).strict();

export const BookingUncheckedUpdateInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateManyInputSchema: z.ZodType<Prisma.BookingCreateManyInput> = z.object({
  id: z.string().optional(),
  eventId: z.string(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  paymentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BookingUpdateManyMutationInputSchema: z.ZodType<Prisma.BookingUpdateManyMutationInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentCreateInputSchema: z.ZodType<Prisma.PaymentCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusEnumSchema).optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  booking: z.lazy(() => BookingCreateNestedOneWithoutPaymentInputSchema).optional()
}).strict();

export const PaymentUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusEnumSchema).optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  booking: z.lazy(() => BookingUncheckedCreateNestedOneWithoutPaymentInputSchema).optional()
}).strict();

export const PaymentUpdateInputSchema: z.ZodType<Prisma.PaymentUpdateInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUpdateOneWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentUncheckedUpdateInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  booking: z.lazy(() => BookingUncheckedUpdateOneWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentCreateManyInputSchema: z.ZodType<Prisma.PaymentCreateManyInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusEnumSchema).optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentUpdateManyMutationInputSchema: z.ZodType<Prisma.PaymentUpdateManyMutationInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional(),
  eventServices: z.lazy(() => EventServiceCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional(),
  eventServices: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional(),
  eventServices: z.lazy(() => EventServiceUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional(),
  eventServices: z.lazy(() => EventServiceUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable(),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable(),
  conversationId: z.string()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable(),
  conversationId: z.string()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountCreateInputSchema: z.ZodType<Prisma.ServiceDiscountCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutDiscountsInputSchema)
}).strict();

export const ServiceDiscountUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean(),
  serviceId: z.string()
}).strict();

export const ServiceDiscountUpdateInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutDiscountsNestedInputSchema).optional()
}).strict();

export const ServiceDiscountUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedUpdateInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountCreateManyInputSchema: z.ZodType<Prisma.ServiceDiscountCreateManyInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean(),
  serviceId: z.string()
}).strict();

export const ServiceDiscountUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedUpdateManyInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateInputSchema: z.ZodType<Prisma.RatingCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutRatingsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutRatingsInputSchema)
}).strict();

export const RatingUncheckedCreateInputSchema: z.ZodType<Prisma.RatingUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendorId: z.string(),
  userId: z.string()
}).strict();

export const RatingUpdateInputSchema: z.ZodType<Prisma.RatingUpdateInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutRatingsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRatingsNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingCreateManyInputSchema: z.ZodType<Prisma.RatingCreateManyInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendorId: z.string(),
  userId: z.string()
}).strict();

export const RatingUpdateManyMutationInputSchema: z.ZodType<Prisma.RatingUpdateManyMutationInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string().optional(),
  serviceId: z.string(),
  vendorId: z.string(),
  reporterId: z.string(),
  issueType: z.lazy(() => ReportIssueTypeSchema),
  description: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional(),
  attachments: z.union([ z.lazy(() => ReportCreateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  serviceId: z.string(),
  vendorId: z.string(),
  reporterId: z.string(),
  issueType: z.lazy(() => ReportIssueTypeSchema),
  description: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional(),
  attachments: z.union([ z.lazy(() => ReportCreateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueType: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => EnumReportIssueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.union([ z.lazy(() => ReportUpdateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueType: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => EnumReportIssueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.union([ z.lazy(() => ReportUpdateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string().optional(),
  serviceId: z.string(),
  vendorId: z.string(),
  reporterId: z.string(),
  issueType: z.lazy(() => ReportIssueTypeSchema),
  description: z.string(),
  status: z.lazy(() => ReportStatusSchema).optional(),
  attachments: z.union([ z.lazy(() => ReportCreateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueType: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => EnumReportIssueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.union([ z.lazy(() => ReportUpdateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reporterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueType: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => EnumReportIssueTypeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => EnumReportStatusFieldUpdateOperationsInputSchema) ]).optional(),
  attachments: z.union([ z.lazy(() => ReportUpdateattachmentsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumRolesFilterSchema: z.ZodType<Prisma.EnumRolesFilter> = z.object({
  equals: z.lazy(() => RolesSchema).optional(),
  in: z.lazy(() => RolesSchema).array().optional(),
  notIn: z.lazy(() => RolesSchema).array().optional(),
  not: z.union([ z.lazy(() => RolesSchema),z.lazy(() => NestedEnumRolesFilterSchema) ]).optional(),
}).strict();

export const EnumOnboardingStatusFilterSchema: z.ZodType<Prisma.EnumOnboardingStatusFilter> = z.object({
  equals: z.lazy(() => OnboardingStatusSchema).optional(),
  in: z.lazy(() => OnboardingStatusSchema).array().optional(),
  notIn: z.lazy(() => OnboardingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => NestedEnumOnboardingStatusFilterSchema) ]).optional(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const VendorNullableRelationFilterSchema: z.ZodType<Prisma.VendorNullableRelationFilter> = z.object({
  is: z.lazy(() => VendorWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => VendorWhereInputSchema).optional().nullable()
}).strict();

export const RatingListRelationFilterSchema: z.ZodType<Prisma.RatingListRelationFilter> = z.object({
  every: z.lazy(() => RatingWhereInputSchema).optional(),
  some: z.lazy(() => RatingWhereInputSchema).optional(),
  none: z.lazy(() => RatingWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RatingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  isNewUser: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  onboardingStatus: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  isNewUser: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  onboardingStatus: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional(),
  isNewUser: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  onboardingStatus: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumRolesWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRolesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RolesSchema).optional(),
  in: z.lazy(() => RolesSchema).array().optional(),
  notIn: z.lazy(() => RolesSchema).array().optional(),
  not: z.union([ z.lazy(() => RolesSchema),z.lazy(() => NestedEnumRolesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRolesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRolesFilterSchema).optional()
}).strict();

export const EnumOnboardingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumOnboardingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OnboardingStatusSchema).optional(),
  in: z.lazy(() => OnboardingStatusSchema).array().optional(),
  notIn: z.lazy(() => OnboardingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => NestedEnumOnboardingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOnboardingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOnboardingStatusFilterSchema).optional()
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const EnumVendorCategoryNullableFilterSchema: z.ZodType<Prisma.EnumVendorCategoryNullableFilter> = z.object({
  equals: z.lazy(() => VendorCategorySchema).optional().nullable(),
  in: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  notIn: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const ServiceListRelationFilterSchema: z.ZodType<Prisma.ServiceListRelationFilter> = z.object({
  every: z.lazy(() => ServiceWhereInputSchema).optional(),
  some: z.lazy(() => ServiceWhereInputSchema).optional(),
  none: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ServiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorCountOrderByAggregateInputSchema: z.ZodType<Prisma.VendorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  availability: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VendorAvgOrderByAggregateInput> = z.object({
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorMinOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorSumOrderByAggregateInputSchema: z.ZodType<Prisma.VendorSumOrderByAggregateInput> = z.object({
  averageRating: z.lazy(() => SortOrderSchema).optional(),
  totalRatings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const EnumVendorCategoryNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumVendorCategoryNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => VendorCategorySchema).optional().nullable(),
  in: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  notIn: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NestedEnumVendorCategoryNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenEmailTokenCompoundUniqueInputSchema: z.ZodType<Prisma.PasswordResetTokenEmailTokenCompoundUniqueInput> = z.object({
  email: z.string(),
  token: z.string()
}).strict();

export const PasswordResetTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumPricingModelFilterSchema: z.ZodType<Prisma.EnumPricingModelFilter> = z.object({
  equals: z.lazy(() => PricingModelSchema).optional(),
  in: z.lazy(() => PricingModelSchema).array().optional(),
  notIn: z.lazy(() => PricingModelSchema).array().optional(),
  not: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => NestedEnumPricingModelFilterSchema) ]).optional(),
}).strict();

export const EnumPublishStatusFilterSchema: z.ZodType<Prisma.EnumPublishStatusFilter> = z.object({
  equals: z.lazy(() => PublishStatusSchema).optional(),
  in: z.lazy(() => PublishStatusSchema).array().optional(),
  notIn: z.lazy(() => PublishStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => NestedEnumPublishStatusFilterSchema) ]).optional(),
}).strict();

export const VendorRelationFilterSchema: z.ZodType<Prisma.VendorRelationFilter> = z.object({
  is: z.lazy(() => VendorWhereInputSchema).optional(),
  isNot: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const EventServiceListRelationFilterSchema: z.ZodType<Prisma.EventServiceListRelationFilter> = z.object({
  every: z.lazy(() => EventServiceWhereInputSchema).optional(),
  some: z.lazy(() => EventServiceWhereInputSchema).optional(),
  none: z.lazy(() => EventServiceWhereInputSchema).optional()
}).strict();

export const ServiceDiscountListRelationFilterSchema: z.ZodType<Prisma.ServiceDiscountListRelationFilter> = z.object({
  every: z.lazy(() => ServiceDiscountWhereInputSchema).optional(),
  some: z.lazy(() => ServiceDiscountWhereInputSchema).optional(),
  none: z.lazy(() => ServiceDiscountWhereInputSchema).optional()
}).strict();

export const EventServiceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventServiceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceDiscountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventIDs: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumPricingModelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPricingModelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PricingModelSchema).optional(),
  in: z.lazy(() => PricingModelSchema).array().optional(),
  notIn: z.lazy(() => PricingModelSchema).array().optional(),
  not: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => NestedEnumPricingModelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPricingModelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPricingModelFilterSchema).optional()
}).strict();

export const EnumPublishStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPublishStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PublishStatusSchema).optional(),
  in: z.lazy(() => PublishStatusSchema).array().optional(),
  notIn: z.lazy(() => PublishStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => NestedEnumPublishStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPublishStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPublishStatusFilterSchema).optional()
}).strict();

export const EventProductListRelationFilterSchema: z.ZodType<Prisma.EventProductListRelationFilter> = z.object({
  every: z.lazy(() => EventProductWhereInputSchema).optional(),
  some: z.lazy(() => EventProductWhereInputSchema).optional(),
  none: z.lazy(() => EventProductWhereInputSchema).optional()
}).strict();

export const EventProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isConsumable: z.lazy(() => SortOrderSchema).optional(),
  onRent: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isConsumable: z.lazy(() => SortOrderSchema).optional(),
  onRent: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isConsumable: z.lazy(() => SortOrderSchema).optional(),
  onRent: z.lazy(() => SortOrderSchema).optional(),
  pricingModel: z.lazy(() => SortOrderSchema).optional(),
  embeddedLookupId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEventStatusEnumFilterSchema: z.ZodType<Prisma.EnumEventStatusEnumFilter> = z.object({
  equals: z.lazy(() => EventStatusEnumSchema).optional(),
  in: z.lazy(() => EventStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => EventStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => NestedEnumEventStatusEnumFilterSchema) ]).optional(),
}).strict();

export const BookingListRelationFilterSchema: z.ZodType<Prisma.BookingListRelationFilter> = z.object({
  every: z.lazy(() => BookingWhereInputSchema).optional(),
  some: z.lazy(() => BookingWhereInputSchema).optional(),
  none: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const BookingOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BookingOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  customId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> = z.object({
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  customId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  customId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z.object({
  guestCount: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  completionRate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEventStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventStatusEnumSchema).optional(),
  in: z.lazy(() => EventStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => EventStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => NestedEnumEventStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventStatusEnumFilterSchema).optional()
}).strict();

export const EnumServiceBookingStatusFilterSchema: z.ZodType<Prisma.EnumServiceBookingStatusFilter> = z.object({
  equals: z.lazy(() => ServiceBookingStatusSchema).optional(),
  in: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  notIn: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => NestedEnumServiceBookingStatusFilterSchema) ]).optional(),
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const ServiceRelationFilterSchema: z.ZodType<Prisma.ServiceRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ConversationNullableRelationFilterSchema: z.ZodType<Prisma.ConversationNullableRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional().nullable()
}).strict();

export const EventServiceEventIdServiceIdCompoundUniqueInputSchema: z.ZodType<Prisma.EventServiceEventIdServiceIdCompoundUniqueInput> = z.object({
  eventId: z.string(),
  serviceId: z.string()
}).strict();

export const EventServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumServiceBookingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumServiceBookingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ServiceBookingStatusSchema).optional(),
  in: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  notIn: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => NestedEnumServiceBookingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumServiceBookingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumServiceBookingStatusFilterSchema).optional()
}).strict();

export const EventNullableRelationFilterSchema: z.ZodType<Prisma.EventNullableRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EventWhereInputSchema).optional().nullable()
}).strict();

export const ProductRelationFilterSchema: z.ZodType<Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const EventProductEventIdProductIdCompoundUniqueInputSchema: z.ZodType<Prisma.EventProductEventIdProductIdCompoundUniqueInput> = z.object({
  eventId: z.string(),
  productId: z.string()
}).strict();

export const EventProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBookingStatusEnumFilterSchema: z.ZodType<Prisma.EnumBookingStatusEnumFilter> = z.object({
  equals: z.lazy(() => BookingStatusEnumSchema).optional(),
  in: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => NestedEnumBookingStatusEnumFilterSchema) ]).optional(),
}).strict();

export const PaymentRelationFilterSchema: z.ZodType<Prisma.PaymentRelationFilter> = z.object({
  is: z.lazy(() => PaymentWhereInputSchema).optional(),
  isNot: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export const BookingCountOrderByAggregateInputSchema: z.ZodType<Prisma.BookingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BookingMinOrderByAggregateInputSchema: z.ZodType<Prisma.BookingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBookingStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBookingStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookingStatusEnumSchema).optional(),
  in: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => NestedEnumBookingStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookingStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookingStatusEnumFilterSchema).optional()
}).strict();

export const EnumPaymentStatusEnumFilterSchema: z.ZodType<Prisma.EnumPaymentStatusEnumFilter> = z.object({
  equals: z.lazy(() => PaymentStatusEnumSchema).optional(),
  in: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema) ]).optional(),
}).strict();

export const BookingNullableRelationFilterSchema: z.ZodType<Prisma.BookingNullableRelationFilter> = z.object({
  is: z.lazy(() => BookingWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => BookingWhereInputSchema).optional().nullable()
}).strict();

export const PaymentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  paymentMethod: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPaymentStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPaymentStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentStatusEnumSchema).optional(),
  in: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => NestedEnumPaymentStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMessageStatusEnumFilterSchema: z.ZodType<Prisma.EnumMessageStatusEnumFilter> = z.object({
  equals: z.lazy(() => MessageStatusEnumSchema).optional(),
  in: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => NestedEnumMessageStatusEnumFilterSchema) ]).optional(),
}).strict();

export const ConversationRelationFilterSchema: z.ZodType<Prisma.ConversationRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachment: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMessageStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMessageStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageStatusEnumSchema).optional(),
  in: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => NestedEnumMessageStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageStatusEnumFilterSchema).optional()
}).strict();

export const EnumDiscountTypeFilterSchema: z.ZodType<Prisma.EnumDiscountTypeFilter> = z.object({
  equals: z.lazy(() => DiscountTypeSchema).optional(),
  in: z.lazy(() => DiscountTypeSchema).array().optional(),
  notIn: z.lazy(() => DiscountTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => NestedEnumDiscountTypeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ServiceDiscountCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional(),
  isPercentage: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceDiscountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountAvgOrderByAggregateInput> = z.object({
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceDiscountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional(),
  isPercentage: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceDiscountMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional(),
  isPercentage: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceDiscountSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceDiscountSumOrderByAggregateInput> = z.object({
  threshold: z.lazy(() => SortOrderSchema).optional(),
  discount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumDiscountTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDiscountTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DiscountTypeSchema).optional(),
  in: z.lazy(() => DiscountTypeSchema).array().optional(),
  notIn: z.lazy(() => DiscountTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => NestedEnumDiscountTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDiscountTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDiscountTypeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const RatingVendorIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.RatingVendorIdUserIdCompoundUniqueInput> = z.object({
  vendorId: z.string(),
  userId: z.string()
}).strict();

export const RatingCountOrderByAggregateInputSchema: z.ZodType<Prisma.RatingCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RatingAvgOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingMinOrderByAggregateInputSchema: z.ZodType<Prisma.RatingMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RatingSumOrderByAggregateInputSchema: z.ZodType<Prisma.RatingSumOrderByAggregateInput> = z.object({
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReportIssueTypeFilterSchema: z.ZodType<Prisma.EnumReportIssueTypeFilter> = z.object({
  equals: z.lazy(() => ReportIssueTypeSchema).optional(),
  in: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => NestedEnumReportIssueTypeFilterSchema) ]).optional(),
}).strict();

export const EnumReportStatusFilterSchema: z.ZodType<Prisma.EnumReportStatusFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusFilterSchema) ]).optional(),
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  issueType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  attachments: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  issueType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  reporterId: z.lazy(() => SortOrderSchema).optional(),
  issueType: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReportIssueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportIssueTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportIssueTypeSchema).optional(),
  in: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => NestedEnumReportIssueTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportIssueTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportIssueTypeFilterSchema).optional()
}).strict();

export const EnumReportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReportStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportStatusFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventCreateWithoutUserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutUserInputSchema),z.lazy(() => EventCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.VendorCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const RatingCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventCreateWithoutUserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutUserInputSchema),z.lazy(() => EventCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.VendorUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const RatingUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const EnumRolesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRolesFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RolesSchema).optional()
}).strict();

export const EnumOnboardingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumOnboardingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => OnboardingStatusSchema).optional()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventCreateWithoutUserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutUserInputSchema),z.lazy(() => EventCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.VendorUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => VendorUpdateWithoutUserInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RatingUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventCreateWithoutUserInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutUserInputSchema),z.lazy(() => EventCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => VendorWhereInputSchema) ]).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => VendorUpdateWithoutUserInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingCreateWithoutUserInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema),z.lazy(() => RatingCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorCreateimagesInputSchema: z.ZodType<Prisma.VendorCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const ServiceCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.ServiceCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceCreateWithoutVendorInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.RatingCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingCreateWithoutVendorInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema),z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutVendorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVendorInputSchema),z.lazy(() => UserUncheckedCreateWithoutVendorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVendorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceCreateWithoutVendorInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.RatingUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingCreateWithoutVendorInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema),z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumVendorCategoryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumVendorCategoryFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => VendorCategorySchema).optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const VendorUpdateimagesInputSchema: z.ZodType<Prisma.VendorUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
  unset: z.boolean().optional()
}).strict();

export const ServiceUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceCreateWithoutVendorInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.RatingUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingCreateWithoutVendorInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema),z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutVendorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutVendorInputSchema),z.lazy(() => UserUncheckedCreateWithoutVendorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutVendorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutVendorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutVendorInputSchema),z.lazy(() => UserUpdateWithoutVendorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVendorInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceCreateWithoutVendorInputSchema).array(),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ServiceCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ServiceUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceWhereUniqueInputSchema),z.lazy(() => ServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ServiceUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => ServiceUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductCreateWithoutVendorInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema),z.lazy(() => ProductCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingCreateWithoutVendorInputSchema).array(),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema),z.lazy(() => RatingCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RatingUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => RatingUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RatingCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RatingWhereUniqueInputSchema),z.lazy(() => RatingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RatingUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => RatingUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RatingUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => RatingUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceCreateeventIDsInputSchema: z.ZodType<Prisma.ServiceCreateeventIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const ServiceCreatetagsInputSchema: z.ZodType<Prisma.ServiceCreatetagsInput> = z.object({
  set: z.string().array()
}).strict();

export const VendorCreateNestedOneWithoutServicesInputSchema: z.ZodType<Prisma.VendorCreateNestedOneWithoutServicesInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedCreateWithoutServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutServicesInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const EventServiceCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceCreateWithoutServiceInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceDiscountCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceDiscountCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceCreateWithoutServiceInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceDiscountUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceDiscountCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumPricingModelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPricingModelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PricingModelSchema).optional()
}).strict();

export const EnumPublishStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPublishStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PublishStatusSchema).optional()
}).strict();

export const ServiceUpdateeventIDsInputSchema: z.ZodType<Prisma.ServiceUpdateeventIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ServiceUpdatetagsInputSchema: z.ZodType<Prisma.ServiceUpdatetagsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutServicesNestedInputSchema: z.ZodType<Prisma.VendorUpdateOneRequiredWithoutServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedCreateWithoutServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutServicesInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutServicesInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutServicesInputSchema),z.lazy(() => VendorUpdateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutServicesInputSchema) ]).optional(),
}).strict();

export const EventServiceUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceCreateWithoutServiceInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceDiscountUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceDiscountUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceDiscountCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceDiscountUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceDiscountUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceDiscountScalarWhereInputSchema),z.lazy(() => ServiceDiscountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceCreateWithoutServiceInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceDiscountUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceDiscountCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceDiscountUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceDiscountCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceDiscountWhereUniqueInputSchema),z.lazy(() => ServiceDiscountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceDiscountUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceDiscountUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceDiscountScalarWhereInputSchema),z.lazy(() => ServiceDiscountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateimagesInputSchema: z.ZodType<Prisma.ProductCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export const VendorCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateNestedOneWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const EventProductCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.EventProductCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductCreateWithoutProductInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventProductUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.EventProductUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductCreateWithoutProductInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateimagesInputSchema: z.ZodType<Prisma.ProductUpdateimagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.VendorUpdateOneRequiredWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutProductsInputSchema),z.lazy(() => VendorUpdateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
}).strict();

export const EventProductUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.EventProductUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductCreateWithoutProductInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventProductUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => EventProductUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventProductUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => EventProductUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventProductUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => EventProductUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventProductUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductCreateWithoutProductInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventProductUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => EventProductUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventProductUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => EventProductUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventProductUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => EventProductUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BookingCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.BookingCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingCreateWithoutEventInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema),z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventServiceCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventServiceCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceCreateWithoutEventInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventProductCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventProductCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductCreateWithoutEventInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEventsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BookingUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingCreateWithoutEventInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema),z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceCreateWithoutEventInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventProductUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.EventProductUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductCreateWithoutEventInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumEventStatusEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventStatusEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EventStatusEnumSchema).optional()
}).strict();

export const BookingUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.BookingUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingCreateWithoutEventInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema),z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceCreateWithoutEventInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventProductUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventProductUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductCreateWithoutEventInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventProductUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventProductUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventProductUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventProductUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventProductUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventProductUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutEventsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEventsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => UserUpdateWithoutEventsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingCreateWithoutEventInputSchema).array(),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema),z.lazy(() => BookingCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BookingUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BookingUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BookingCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BookingWhereUniqueInputSchema),z.lazy(() => BookingWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BookingUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => BookingUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BookingUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => BookingUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceCreateWithoutEventInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventProductUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductCreateWithoutEventInputSchema).array(),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema),z.lazy(() => EventProductCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventProductUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventProductUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventProductCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventProductWhereUniqueInputSchema),z.lazy(() => EventProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventProductUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => EventProductUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventProductUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => EventProductUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutEventServiceInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutEventServiceInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventServiceInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedOneWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutEventServiceInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutEventServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutEventServiceInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const ConversationCreateNestedOneWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutEventServicesInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutEventServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutEventServicesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional()
}).strict();

export const EnumServiceBookingStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumServiceBookingStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ServiceBookingStatusSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutEventServiceNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutEventServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventServiceInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutEventServiceInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutEventServiceInputSchema),z.lazy(() => EventUpdateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventServiceInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateOneRequiredWithoutEventServiceNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutEventServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutEventServiceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutEventServiceInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutEventServiceInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutEventServiceInputSchema),z.lazy(() => ServiceUpdateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutEventServiceInputSchema) ]).optional(),
}).strict();

export const ConversationUpdateOneWithoutEventServicesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneWithoutEventServicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutEventServicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutEventServicesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutEventServicesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutEventServicesInputSchema),z.lazy(() => ConversationUpdateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutEventServicesInputSchema) ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutEventProductInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutEventProductInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventProductInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const ProductCreateNestedOneWithoutEventProductInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutEventProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedCreateWithoutEventProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutEventProductInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const EventUpdateOneWithoutEventProductNestedInputSchema: z.ZodType<Prisma.EventUpdateOneWithoutEventProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutEventProductInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutEventProductInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EventWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutEventProductInputSchema),z.lazy(() => EventUpdateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventProductInputSchema) ]).optional(),
}).strict();

export const ProductUpdateOneRequiredWithoutEventProductNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutEventProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedCreateWithoutEventProductInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutEventProductInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutEventProductInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutEventProductInputSchema),z.lazy(() => ProductUpdateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutEventProductInputSchema) ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutBookingsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutBookingsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutBookingsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const PaymentCreateNestedOneWithoutBookingInputSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutBookingInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional()
}).strict();

export const EnumBookingStatusEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBookingStatusEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BookingStatusEnumSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutBookingsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutBookingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedCreateWithoutBookingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutBookingsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutBookingsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutBookingsInputSchema),z.lazy(() => EventUpdateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBookingsInputSchema) ]).optional(),
}).strict();

export const PaymentUpdateOneRequiredWithoutBookingNestedInputSchema: z.ZodType<Prisma.PaymentUpdateOneRequiredWithoutBookingNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutBookingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutBookingInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutBookingInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateToOneWithWhereWithoutBookingInputSchema),z.lazy(() => PaymentUpdateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutBookingInputSchema) ]).optional(),
}).strict();

export const BookingCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.BookingCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional()
}).strict();

export const BookingUncheckedCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUncheckedCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional()
}).strict();

export const EnumPaymentStatusEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPaymentStatusEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PaymentStatusEnumSchema).optional()
}).strict();

export const BookingUpdateOneWithoutPaymentNestedInputSchema: z.ZodType<Prisma.BookingUpdateOneWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => BookingUpsertWithoutPaymentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookingUpdateToOneWithWhereWithoutPaymentInputSchema),z.lazy(() => BookingUpdateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateOneWithoutPaymentNestedInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateOneWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BookingCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => BookingUpsertWithoutPaymentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BookingWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BookingWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BookingUpdateToOneWithWhereWithoutPaymentInputSchema),z.lazy(() => BookingUpdateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventServiceCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceCreateWithoutConversationInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceCreateWithoutConversationInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceCreateWithoutConversationInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceCreateWithoutConversationInputSchema).array(),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema),z.lazy(() => EventServiceCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => EventServiceUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventServiceCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventServiceWhereUniqueInputSchema),z.lazy(() => EventServiceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => EventServiceUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventServiceUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => EventServiceUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional()
}).strict();

export const EnumMessageStatusEnumFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMessageStatusEnumFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MessageStatusEnumSchema).optional()
}).strict();

export const ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const ServiceCreateNestedOneWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutDiscountsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDiscountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutDiscountsInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const EnumDiscountTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDiscountTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DiscountTypeSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ServiceUpdateOneRequiredWithoutDiscountsNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutDiscountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDiscountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutDiscountsInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutDiscountsInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutDiscountsInputSchema),z.lazy(() => ServiceUpdateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDiscountsInputSchema) ]).optional(),
}).strict();

export const VendorCreateNestedOneWithoutRatingsInputSchema: z.ZodType<Prisma.VendorCreateNestedOneWithoutRatingsInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutRatingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutRatingsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRatingsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRatingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRatingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const VendorUpdateOneRequiredWithoutRatingsNestedInputSchema: z.ZodType<Prisma.VendorUpdateOneRequiredWithoutRatingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutRatingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutRatingsInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutRatingsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutRatingsInputSchema),z.lazy(() => VendorUpdateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutRatingsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRatingsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRatingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRatingsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRatingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRatingsInputSchema),z.lazy(() => UserUpdateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingsInputSchema) ]).optional(),
}).strict();

export const ReportCreateattachmentsInputSchema: z.ZodType<Prisma.ReportCreateattachmentsInput> = z.object({
  set: z.string().array()
}).strict();

export const EnumReportIssueTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportIssueTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportIssueTypeSchema).optional()
}).strict();

export const EnumReportStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReportStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReportStatusSchema).optional()
}).strict();

export const ReportUpdateattachmentsInputSchema: z.ZodType<Prisma.ReportUpdateattachmentsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumRolesFilterSchema: z.ZodType<Prisma.NestedEnumRolesFilter> = z.object({
  equals: z.lazy(() => RolesSchema).optional(),
  in: z.lazy(() => RolesSchema).array().optional(),
  notIn: z.lazy(() => RolesSchema).array().optional(),
  not: z.union([ z.lazy(() => RolesSchema),z.lazy(() => NestedEnumRolesFilterSchema) ]).optional(),
}).strict();

export const NestedEnumOnboardingStatusFilterSchema: z.ZodType<Prisma.NestedEnumOnboardingStatusFilter> = z.object({
  equals: z.lazy(() => OnboardingStatusSchema).optional(),
  in: z.lazy(() => OnboardingStatusSchema).array().optional(),
  notIn: z.lazy(() => OnboardingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => NestedEnumOnboardingStatusFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumRolesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRolesWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RolesSchema).optional(),
  in: z.lazy(() => RolesSchema).array().optional(),
  notIn: z.lazy(() => RolesSchema).array().optional(),
  not: z.union([ z.lazy(() => RolesSchema),z.lazy(() => NestedEnumRolesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRolesFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRolesFilterSchema).optional()
}).strict();

export const NestedEnumOnboardingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumOnboardingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => OnboardingStatusSchema).optional(),
  in: z.lazy(() => OnboardingStatusSchema).array().optional(),
  notIn: z.lazy(() => OnboardingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => NestedEnumOnboardingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumOnboardingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumOnboardingStatusFilterSchema).optional()
}).strict();

export const NestedEnumVendorCategoryNullableFilterSchema: z.ZodType<Prisma.NestedEnumVendorCategoryNullableFilter> = z.object({
  equals: z.lazy(() => VendorCategorySchema).optional().nullable(),
  in: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  notIn: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional().nullable(),
  not: InputJsonValueSchema.optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedEnumVendorCategoryNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumVendorCategoryNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => VendorCategorySchema).optional().nullable(),
  in: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  notIn: z.lazy(() => VendorCategorySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NestedEnumVendorCategoryNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVendorCategoryNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPricingModelFilterSchema: z.ZodType<Prisma.NestedEnumPricingModelFilter> = z.object({
  equals: z.lazy(() => PricingModelSchema).optional(),
  in: z.lazy(() => PricingModelSchema).array().optional(),
  notIn: z.lazy(() => PricingModelSchema).array().optional(),
  not: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => NestedEnumPricingModelFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPublishStatusFilterSchema: z.ZodType<Prisma.NestedEnumPublishStatusFilter> = z.object({
  equals: z.lazy(() => PublishStatusSchema).optional(),
  in: z.lazy(() => PublishStatusSchema).array().optional(),
  notIn: z.lazy(() => PublishStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => NestedEnumPublishStatusFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumPricingModelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPricingModelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PricingModelSchema).optional(),
  in: z.lazy(() => PricingModelSchema).array().optional(),
  notIn: z.lazy(() => PricingModelSchema).array().optional(),
  not: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => NestedEnumPricingModelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPricingModelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPricingModelFilterSchema).optional()
}).strict();

export const NestedEnumPublishStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPublishStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PublishStatusSchema).optional(),
  in: z.lazy(() => PublishStatusSchema).array().optional(),
  notIn: z.lazy(() => PublishStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => NestedEnumPublishStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPublishStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPublishStatusFilterSchema).optional()
}).strict();

export const NestedEnumEventStatusEnumFilterSchema: z.ZodType<Prisma.NestedEnumEventStatusEnumFilter> = z.object({
  equals: z.lazy(() => EventStatusEnumSchema).optional(),
  in: z.lazy(() => EventStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => EventStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => NestedEnumEventStatusEnumFilterSchema) ]).optional(),
}).strict();

export const NestedEnumEventStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventStatusEnumSchema).optional(),
  in: z.lazy(() => EventStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => EventStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => NestedEnumEventStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventStatusEnumFilterSchema).optional()
}).strict();

export const NestedEnumServiceBookingStatusFilterSchema: z.ZodType<Prisma.NestedEnumServiceBookingStatusFilter> = z.object({
  equals: z.lazy(() => ServiceBookingStatusSchema).optional(),
  in: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  notIn: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => NestedEnumServiceBookingStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumServiceBookingStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumServiceBookingStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ServiceBookingStatusSchema).optional(),
  in: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  notIn: z.lazy(() => ServiceBookingStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => NestedEnumServiceBookingStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumServiceBookingStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumServiceBookingStatusFilterSchema).optional()
}).strict();

export const NestedEnumBookingStatusEnumFilterSchema: z.ZodType<Prisma.NestedEnumBookingStatusEnumFilter> = z.object({
  equals: z.lazy(() => BookingStatusEnumSchema).optional(),
  in: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => NestedEnumBookingStatusEnumFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBookingStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBookingStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BookingStatusEnumSchema).optional(),
  in: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => BookingStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => NestedEnumBookingStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBookingStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBookingStatusEnumFilterSchema).optional()
}).strict();

export const NestedEnumPaymentStatusEnumFilterSchema: z.ZodType<Prisma.NestedEnumPaymentStatusEnumFilter> = z.object({
  equals: z.lazy(() => PaymentStatusEnumSchema).optional(),
  in: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPaymentStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPaymentStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PaymentStatusEnumSchema).optional(),
  in: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => PaymentStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => NestedEnumPaymentStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusEnumFilterSchema).optional()
}).strict();

export const NestedEnumMessageStatusEnumFilterSchema: z.ZodType<Prisma.NestedEnumMessageStatusEnumFilter> = z.object({
  equals: z.lazy(() => MessageStatusEnumSchema).optional(),
  in: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => NestedEnumMessageStatusEnumFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMessageStatusEnumWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMessageStatusEnumWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageStatusEnumSchema).optional(),
  in: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  notIn: z.lazy(() => MessageStatusEnumSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => NestedEnumMessageStatusEnumWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageStatusEnumFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageStatusEnumFilterSchema).optional()
}).strict();

export const NestedEnumDiscountTypeFilterSchema: z.ZodType<Prisma.NestedEnumDiscountTypeFilter> = z.object({
  equals: z.lazy(() => DiscountTypeSchema).optional(),
  in: z.lazy(() => DiscountTypeSchema).array().optional(),
  notIn: z.lazy(() => DiscountTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => NestedEnumDiscountTypeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumDiscountTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDiscountTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => DiscountTypeSchema).optional(),
  in: z.lazy(() => DiscountTypeSchema).array().optional(),
  notIn: z.lazy(() => DiscountTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => NestedEnumDiscountTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDiscountTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDiscountTypeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumReportIssueTypeFilterSchema: z.ZodType<Prisma.NestedEnumReportIssueTypeFilter> = z.object({
  equals: z.lazy(() => ReportIssueTypeSchema).optional(),
  in: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => NestedEnumReportIssueTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReportStatusFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReportIssueTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportIssueTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportIssueTypeSchema).optional(),
  in: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  notIn: z.lazy(() => ReportIssueTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportIssueTypeSchema),z.lazy(() => NestedEnumReportIssueTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportIssueTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportIssueTypeFilterSchema).optional()
}).strict();

export const NestedEnumReportStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReportStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReportStatusSchema).optional(),
  in: z.lazy(() => ReportStatusSchema).array().optional(),
  notIn: z.lazy(() => ReportStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ReportStatusSchema),z.lazy(() => NestedEnumReportStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReportStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReportStatusFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const EventCreateWithoutUserInputSchema: z.ZodType<Prisma.EventCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  bookings: z.lazy(() => BookingCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  bookings: z.lazy(() => BookingUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EventCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyUserInputSchema),z.lazy(() => EventCreateManyUserInputSchema).array() ]),
}).strict();

export const VendorCreateWithoutUserInputSchema: z.ZodType<Prisma.VendorCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RatingCreateWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutRatingsInputSchema)
}).strict();

export const RatingUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendorId: z.string()
}).strict();

export const RatingCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RatingCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyUserInputSchema),z.lazy(() => RatingCreateManyUserInputSchema).array() ]),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutUserInputSchema),z.lazy(() => EventUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutUserInputSchema),z.lazy(() => EventUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutUserInputSchema),z.lazy(() => EventUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  guestCount: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  totalPrice: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  completionRate: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumEventStatusEnumFilterSchema),z.lazy(() => EventStatusEnumSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  customId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VendorUpsertWithoutUserInputSchema: z.ZodType<Prisma.VendorUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => VendorUpdateWithoutUserInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => VendorCreateWithoutUserInputSchema),z.lazy(() => VendorUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VendorUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => VendorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VendorUpdateWithoutUserInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const VendorUpdateWithoutUserInputSchema: z.ZodType<Prisma.VendorUpdateWithoutUserInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  services: z.lazy(() => ServiceUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutUserInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const RatingUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutUserInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutUserInputSchema),z.lazy(() => RatingUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutUserInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RatingScalarWhereInputSchema: z.ZodType<Prisma.RatingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RatingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RatingScalarWhereInputSchema),z.lazy(() => RatingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ServiceCreateWithoutVendorInputSchema: z.ZodType<Prisma.ServiceCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutServiceInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutServiceInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutVendorInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const ServiceCreateManyVendorInputEnvelopeSchema: z.ZodType<Prisma.ServiceCreateManyVendorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ServiceCreateManyVendorInputSchema),z.lazy(() => ServiceCreateManyVendorInputSchema).array() ]),
}).strict();

export const ProductCreateWithoutVendorInputSchema: z.ZodType<Prisma.ProductCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutVendorInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const ProductCreateManyVendorInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyVendorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyVendorInputSchema),z.lazy(() => ProductCreateManyVendorInputSchema).array() ]),
}).strict();

export const RatingCreateWithoutVendorInputSchema: z.ZodType<Prisma.RatingCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRatingsInputSchema)
}).strict();

export const RatingUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.RatingUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const RatingCreateOrConnectWithoutVendorInputSchema: z.ZodType<Prisma.RatingCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const RatingCreateManyVendorInputEnvelopeSchema: z.ZodType<Prisma.RatingCreateManyVendorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RatingCreateManyVendorInputSchema),z.lazy(() => RatingCreateManyVendorInputSchema).array() ]),
}).strict();

export const UserCreateWithoutVendorInputSchema: z.ZodType<Prisma.UserCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutVendorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutVendorInputSchema),z.lazy(() => UserUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const ServiceUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceUpdateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const ServiceUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutVendorInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export const ServiceUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => ServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceUpdateManyMutationInputSchema),z.lazy(() => ServiceUncheckedUpdateManyWithoutVendorInputSchema) ]),
}).strict();

export const ServiceScalarWhereInputSchema: z.ZodType<Prisma.ServiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereInputSchema),z.lazy(() => ServiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  eventIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ProductUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutVendorInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutVendorInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isConsumable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  onRent: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => EnumPricingModelFilterSchema),z.lazy(() => PricingModelSchema) ]).optional(),
  embeddedLookupId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumPublishStatusFilterSchema),z.lazy(() => PublishStatusSchema) ]).optional(),
  vendorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const RatingUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RatingUpdateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => RatingCreateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const RatingUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => RatingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateWithoutVendorInputSchema),z.lazy(() => RatingUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export const RatingUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => RatingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RatingUpdateManyMutationInputSchema),z.lazy(() => RatingUncheckedUpdateManyWithoutVendorInputSchema) ]),
}).strict();

export const UserUpsertWithoutVendorInputSchema: z.ZodType<Prisma.UserUpsertWithoutVendorInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutVendorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutVendorInputSchema),z.lazy(() => UserUncheckedCreateWithoutVendorInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutVendorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export const UserUpdateWithoutVendorInputSchema: z.ZodType<Prisma.UserUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutVendorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const VendorCreateWithoutServicesInputSchema: z.ZodType<Prisma.VendorCreateWithoutServicesInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  products: z.lazy(() => ProductCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutVendorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVendorInputSchema)
}).strict();

export const VendorUncheckedCreateWithoutServicesInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutServicesInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  userId: z.string(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorCreateOrConnectWithoutServicesInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutServicesInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorCreateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedCreateWithoutServicesInputSchema) ]),
}).strict();

export const EventServiceCreateWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceCreateWithoutServiceInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventServiceInputSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutEventServicesInputSchema).optional()
}).strict();

export const EventServiceUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const EventServiceCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const EventServiceCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.EventServiceCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventServiceCreateManyServiceInputSchema),z.lazy(() => EventServiceCreateManyServiceInputSchema).array() ]),
}).strict();

export const ServiceDiscountCreateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountCreateWithoutServiceInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean()
}).strict();

export const ServiceDiscountUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean()
}).strict();

export const ServiceDiscountCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceDiscountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceDiscountCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.ServiceDiscountCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ServiceDiscountCreateManyServiceInputSchema),z.lazy(() => ServiceDiscountCreateManyServiceInputSchema).array() ]),
}).strict();

export const VendorUpsertWithoutServicesInputSchema: z.ZodType<Prisma.VendorUpsertWithoutServicesInput> = z.object({
  update: z.union([ z.lazy(() => VendorUpdateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutServicesInputSchema) ]),
  create: z.union([ z.lazy(() => VendorCreateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedCreateWithoutServicesInputSchema) ]),
  where: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorUpdateToOneWithWhereWithoutServicesInputSchema: z.ZodType<Prisma.VendorUpdateToOneWithWhereWithoutServicesInput> = z.object({
  where: z.lazy(() => VendorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VendorUpdateWithoutServicesInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutServicesInputSchema) ]),
}).strict();

export const VendorUpdateWithoutServicesInputSchema: z.ZodType<Prisma.VendorUpdateWithoutServicesInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  products: z.lazy(() => ProductUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutVendorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateWithoutServicesInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutServicesInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const EventServiceUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventServiceUpdateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const EventServiceUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateWithoutServiceInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const EventServiceUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => EventServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateManyMutationInputSchema),z.lazy(() => EventServiceUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const EventServiceScalarWhereInputSchema: z.ZodType<Prisma.EventServiceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventServiceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventServiceScalarWhereInputSchema),z.lazy(() => EventServiceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumServiceBookingStatusFilterSchema),z.lazy(() => ServiceBookingStatusSchema) ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  conversationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ServiceDiscountUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceDiscountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceDiscountUpdateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceDiscountCreateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceDiscountUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceDiscountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceDiscountUpdateWithoutServiceInputSchema),z.lazy(() => ServiceDiscountUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceDiscountUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceDiscountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceDiscountUpdateManyMutationInputSchema),z.lazy(() => ServiceDiscountUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const ServiceDiscountScalarWhereInputSchema: z.ZodType<Prisma.ServiceDiscountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceDiscountScalarWhereInputSchema),z.lazy(() => ServiceDiscountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceDiscountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceDiscountScalarWhereInputSchema),z.lazy(() => ServiceDiscountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDiscountTypeFilterSchema),z.lazy(() => DiscountTypeSchema) ]).optional(),
  threshold: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  discount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isPercentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VendorCreateWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutVendorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVendorInputSchema)
}).strict();

export const VendorUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutProductsInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  userId: z.string(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutProductsInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorCreateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const EventProductCreateWithoutProductInputSchema: z.ZodType<Prisma.EventProductCreateWithoutProductInput> = z.object({
  id: z.string().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventProductInputSchema).optional()
}).strict();

export const EventProductUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.EventProductUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().optional(),
  eventId: z.string().optional().nullable()
}).strict();

export const EventProductCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.EventProductCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const EventProductCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.EventProductCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventProductCreateManyProductInputSchema),z.lazy(() => EventProductCreateManyProductInputSchema).array() ]),
}).strict();

export const VendorUpsertWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpsertWithoutProductsInput> = z.object({
  update: z.union([ z.lazy(() => VendorUpdateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => VendorCreateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpdateToOneWithWhereWithoutProductsInput> = z.object({
  where: z.lazy(() => VendorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VendorUpdateWithoutProductsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutProductsInputSchema) ]),
}).strict();

export const VendorUpdateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUpdateWithoutProductsInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  services: z.lazy(() => ServiceUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutVendorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutProductsInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const EventProductUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.EventProductUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventProductUpdateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => EventProductCreateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const EventProductUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.EventProductUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventProductUpdateWithoutProductInputSchema),z.lazy(() => EventProductUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const EventProductUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.EventProductUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => EventProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventProductUpdateManyMutationInputSchema),z.lazy(() => EventProductUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const EventProductScalarWhereInputSchema: z.ZodType<Prisma.EventProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventProductScalarWhereInputSchema),z.lazy(() => EventProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const BookingCreateWithoutEventInputSchema: z.ZodType<Prisma.BookingCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutBookingInputSchema)
}).strict();

export const BookingUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  paymentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BookingCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const BookingCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.BookingCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BookingCreateManyEventInputSchema),z.lazy(() => BookingCreateManyEventInputSchema).array() ]),
}).strict();

export const EventServiceCreateWithoutEventInputSchema: z.ZodType<Prisma.EventServiceCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutEventServiceInputSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutEventServicesInputSchema).optional()
}).strict();

export const EventServiceUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const EventServiceCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventServiceCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventServiceCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.EventServiceCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventServiceCreateManyEventInputSchema),z.lazy(() => EventServiceCreateManyEventInputSchema).array() ]),
}).strict();

export const EventProductCreateWithoutEventInputSchema: z.ZodType<Prisma.EventProductCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutEventProductInputSchema)
}).strict();

export const EventProductUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.EventProductUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  productId: z.string()
}).strict();

export const EventProductCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.EventProductCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventProductCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.EventProductCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventProductCreateManyEventInputSchema),z.lazy(() => EventProductCreateManyEventInputSchema).array() ]),
}).strict();

export const UserCreateWithoutEventsInputSchema: z.ZodType<Prisma.UserCreateWithoutEventsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEventsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const BookingUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.BookingUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BookingUpdateWithoutEventInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutEventInputSchema),z.lazy(() => BookingUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const BookingUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.BookingUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateWithoutEventInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const BookingUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.BookingUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => BookingScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BookingUpdateManyMutationInputSchema),z.lazy(() => BookingUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const BookingScalarWhereInputSchema: z.ZodType<Prisma.BookingScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BookingScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BookingScalarWhereInputSchema),z.lazy(() => BookingScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumBookingStatusEnumFilterSchema),z.lazy(() => BookingStatusEnumSchema) ]).optional(),
  paymentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventServiceUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventServiceUpdateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventServiceUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateWithoutEventInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventServiceUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateManyMutationInputSchema),z.lazy(() => EventServiceUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const EventProductUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventProductUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventProductUpdateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => EventProductCreateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventProductUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.EventProductUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => EventProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventProductUpdateWithoutEventInputSchema),z.lazy(() => EventProductUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const EventProductUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.EventProductUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => EventProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventProductUpdateManyMutationInputSchema),z.lazy(() => EventProductUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const UserUpsertWithoutEventsInputSchema: z.ZodType<Prisma.UserUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEventsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEventsInputSchema),z.lazy(() => UserUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEventsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const UserUpdateWithoutEventsInputSchema: z.ZodType<Prisma.UserUpdateWithoutEventsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEventsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  ratings: z.lazy(() => RatingUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutEventServiceInputSchema: z.ZodType<Prisma.EventCreateWithoutEventServiceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  bookings: z.lazy(() => BookingCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutEventInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEventsInputSchema)
}).strict();

export const EventUncheckedCreateWithoutEventServiceInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutEventServiceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  userId: z.string(),
  bookings: z.lazy(() => BookingUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutEventServiceInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutEventServiceInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventServiceInputSchema) ]),
}).strict();

export const ServiceCreateWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceCreateWithoutEventServiceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutServicesInputSchema),
  discounts: z.lazy(() => ServiceDiscountCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutEventServiceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.string(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  discounts: z.lazy(() => ServiceDiscountUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutEventServiceInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutEventServiceInputSchema) ]),
}).strict();

export const ConversationCreateWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutEventServicesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutEventServicesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutEventServicesInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutEventServicesInputSchema) ]),
}).strict();

export const EventUpsertWithoutEventServiceInputSchema: z.ZodType<Prisma.EventUpsertWithoutEventServiceInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventServiceInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventServiceInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutEventServiceInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutEventServiceInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutEventServiceInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventServiceInputSchema) ]),
}).strict();

export const EventUpdateWithoutEventServiceInputSchema: z.ZodType<Prisma.EventUpdateWithoutEventServiceInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookings: z.lazy(() => BookingUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutEventNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutEventServiceInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutEventServiceInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => BookingUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const ServiceUpsertWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutEventServiceInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutEventServiceInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutEventServiceInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutEventServiceInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutEventServiceInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutEventServiceInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutEventServiceInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutServicesNestedInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutEventServiceInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutEventServiceInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discounts: z.lazy(() => ServiceDiscountUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ConversationUpsertWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutEventServicesInput> = z.object({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutEventServicesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutEventServicesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ConversationUpdateToOneWithWhereWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutEventServicesInput> = z.object({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutEventServicesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutEventServicesInputSchema) ]),
}).strict();

export const ConversationUpdateWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutEventServicesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutEventServicesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutEventServicesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutEventProductInputSchema: z.ZodType<Prisma.EventCreateWithoutEventProductInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  bookings: z.lazy(() => BookingCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutEventInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEventsInputSchema)
}).strict();

export const EventUncheckedCreateWithoutEventProductInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutEventProductInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  userId: z.string(),
  bookings: z.lazy(() => BookingUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutEventProductInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutEventProductInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventProductInputSchema) ]),
}).strict();

export const ProductCreateWithoutEventProductInputSchema: z.ZodType<Prisma.ProductCreateWithoutEventProductInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutProductsInputSchema)
}).strict();

export const ProductUncheckedCreateWithoutEventProductInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutEventProductInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  vendorId: z.string(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const ProductCreateOrConnectWithoutEventProductInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutEventProductInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedCreateWithoutEventProductInputSchema) ]),
}).strict();

export const EventUpsertWithoutEventProductInputSchema: z.ZodType<Prisma.EventUpsertWithoutEventProductInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventProductInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventProductInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutEventProductInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutEventProductInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutEventProductInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventProductInputSchema) ]),
}).strict();

export const EventUpdateWithoutEventProductInputSchema: z.ZodType<Prisma.EventUpdateWithoutEventProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookings: z.lazy(() => BookingUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutEventNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutEventProductInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutEventProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bookings: z.lazy(() => BookingUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const ProductUpsertWithoutEventProductInputSchema: z.ZodType<Prisma.ProductUpsertWithoutEventProductInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutEventProductInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedCreateWithoutEventProductInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductUpdateToOneWithWhereWithoutEventProductInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutEventProductInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutEventProductInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutEventProductInputSchema) ]),
}).strict();

export const ProductUpdateWithoutEventProductInputSchema: z.ZodType<Prisma.ProductUpdateWithoutEventProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutProductsNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutEventProductInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutEventProductInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventCreateWithoutBookingsInputSchema: z.ZodType<Prisma.EventCreateWithoutBookingsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductCreateNestedManyWithoutEventInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEventsInputSchema)
}).strict();

export const EventUncheckedCreateWithoutBookingsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutBookingsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable(),
  userId: z.string(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutEventInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventCreateOrConnectWithoutBookingsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutBookingsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedCreateWithoutBookingsInputSchema) ]),
}).strict();

export const PaymentCreateWithoutBookingInputSchema: z.ZodType<Prisma.PaymentCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusEnumSchema).optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentUncheckedCreateWithoutBookingInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutBookingInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  status: z.lazy(() => PaymentStatusEnumSchema).optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PaymentCreateOrConnectWithoutBookingInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutBookingInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutBookingInputSchema) ]),
}).strict();

export const EventUpsertWithoutBookingsInputSchema: z.ZodType<Prisma.EventUpsertWithoutBookingsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBookingsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedCreateWithoutBookingsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutBookingsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutBookingsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutBookingsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutBookingsInputSchema) ]),
}).strict();

export const EventUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.EventUpdateWithoutBookingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutEventNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutBookingsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutBookingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const PaymentUpsertWithoutBookingInputSchema: z.ZodType<Prisma.PaymentUpsertWithoutBookingInput> = z.object({
  update: z.union([ z.lazy(() => PaymentUpdateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutBookingInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutBookingInputSchema) ]),
  where: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export const PaymentUpdateToOneWithWhereWithoutBookingInputSchema: z.ZodType<Prisma.PaymentUpdateToOneWithWhereWithoutBookingInput> = z.object({
  where: z.lazy(() => PaymentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PaymentUpdateWithoutBookingInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutBookingInputSchema) ]),
}).strict();

export const PaymentUpdateWithoutBookingInputSchema: z.ZodType<Prisma.PaymentUpdateWithoutBookingInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateWithoutBookingInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateWithoutBookingInput> = z.object({
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PaymentStatusEnumSchema),z.lazy(() => EnumPaymentStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentMethod: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingCreateWithoutPaymentInputSchema: z.ZodType<Prisma.BookingCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutBookingsInputSchema)
}).strict();

export const BookingUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUncheckedCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  eventId: z.string(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BookingCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.BookingCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => BookingWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const BookingUpsertWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUpsertWithoutPaymentInput> = z.object({
  update: z.union([ z.lazy(() => BookingUpdateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => BookingCreateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedCreateWithoutPaymentInputSchema) ]),
  where: z.lazy(() => BookingWhereInputSchema).optional()
}).strict();

export const BookingUpdateToOneWithWhereWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUpdateToOneWithWhereWithoutPaymentInput> = z.object({
  where: z.lazy(() => BookingWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BookingUpdateWithoutPaymentInputSchema),z.lazy(() => BookingUncheckedUpdateWithoutPaymentInputSchema) ]),
}).strict();

export const BookingUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUpdateWithoutPaymentInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutBookingsNestedInputSchema).optional()
}).strict();

export const BookingUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutPaymentInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable()
}).strict();

export const MessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable()
}).strict();

export const MessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyConversationInputSchema),z.lazy(() => MessageCreateManyConversationInputSchema).array() ]),
}).strict();

export const EventServiceCreateWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  event: z.lazy(() => EventCreateNestedOneWithoutEventServiceInputSchema),
  service: z.lazy(() => ServiceCreateNestedOneWithoutEventServiceInputSchema)
}).strict();

export const EventServiceUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const EventServiceCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const EventServiceCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.EventServiceCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventServiceCreateManyConversationInputSchema),z.lazy(() => EventServiceCreateManyConversationInputSchema).array() ]),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumMessageStatusEnumFilterSchema),z.lazy(() => MessageStatusEnumSchema) ]).optional(),
  attachment: z.lazy(() => JsonNullableFilterSchema).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const EventServiceUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventServiceUpdateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => EventServiceCreateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const EventServiceUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => EventServiceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateWithoutConversationInputSchema),z.lazy(() => EventServiceUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const EventServiceUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => EventServiceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventServiceUpdateManyMutationInputSchema),z.lazy(() => EventServiceUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  eventServices: z.lazy(() => EventServiceCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  eventServices: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutMessagesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  eventServices: z.lazy(() => EventServiceUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  eventServices: z.lazy(() => EventServiceUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ServiceCreateWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceCreateWithoutDiscountsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutServicesInputSchema),
  eventService: z.lazy(() => EventServiceCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutDiscountsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.string(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutDiscountsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDiscountsInputSchema) ]),
}).strict();

export const ServiceUpsertWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutDiscountsInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDiscountsInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutDiscountsInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutDiscountsInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutDiscountsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutDiscountsInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutDiscountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutServicesNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutDiscountsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutDiscountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const VendorCreateWithoutRatingsInputSchema: z.ZodType<Prisma.VendorCreateWithoutRatingsInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  services: z.lazy(() => ServiceCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutVendorInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutVendorInputSchema)
}).strict();

export const VendorUncheckedCreateWithoutRatingsInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutRatingsInput> = z.object({
  id: z.string().optional(),
  businessName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  availability: InputJsonValueSchema.optional().nullable(),
  category: z.lazy(() => VendorCategorySchema).optional().nullable(),
  images: z.union([ z.lazy(() => VendorCreateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.number().optional().nullable(),
  totalRatings: z.number().int().optional().nullable(),
  userId: z.string(),
  services: z.lazy(() => ServiceUncheckedCreateNestedManyWithoutVendorInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorCreateOrConnectWithoutRatingsInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutRatingsInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorCreateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutRatingsInputSchema) ]),
}).strict();

export const UserCreateWithoutRatingsInputSchema: z.ZodType<Prisma.UserCreateWithoutRatingsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRatingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRatingsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  isNewUser: z.boolean().optional().nullable(),
  role: z.lazy(() => RolesSchema).optional(),
  onboardingStatus: z.lazy(() => OnboardingStatusSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRatingsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRatingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingsInputSchema) ]),
}).strict();

export const VendorUpsertWithoutRatingsInputSchema: z.ZodType<Prisma.VendorUpsertWithoutRatingsInput> = z.object({
  update: z.union([ z.lazy(() => VendorUpdateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutRatingsInputSchema) ]),
  create: z.union([ z.lazy(() => VendorCreateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutRatingsInputSchema) ]),
  where: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorUpdateToOneWithWhereWithoutRatingsInputSchema: z.ZodType<Prisma.VendorUpdateToOneWithWhereWithoutRatingsInput> = z.object({
  where: z.lazy(() => VendorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VendorUpdateWithoutRatingsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutRatingsInputSchema) ]),
}).strict();

export const VendorUpdateWithoutRatingsInputSchema: z.ZodType<Prisma.VendorUpdateWithoutRatingsInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  services: z.lazy(() => ServiceUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutVendorNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateWithoutRatingsInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutRatingsInput> = z.object({
  businessName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  availability: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
  category: z.union([ z.lazy(() => VendorCategorySchema),z.lazy(() => NullableEnumVendorCategoryFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  images: z.union([ z.lazy(() => VendorUpdateimagesInputSchema),z.string().array() ]).optional(),
  averageRating: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalRatings: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  services: z.lazy(() => ServiceUncheckedUpdateManyWithoutVendorNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutRatingsInputSchema: z.ZodType<Prisma.UserUpsertWithoutRatingsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutRatingsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRatingsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRatingsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRatingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRatingsInputSchema) ]),
}).strict();

export const UserUpdateWithoutRatingsInputSchema: z.ZodType<Prisma.UserUpdateWithoutRatingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRatingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRatingsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isNewUser: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.lazy(() => RolesSchema),z.lazy(() => EnumRolesFieldUpdateOperationsInputSchema) ]).optional(),
  onboardingStatus: z.union([ z.lazy(() => OnboardingStatusSchema),z.lazy(() => EnumOnboardingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const EventCreateManyUserInputSchema: z.ZodType<Prisma.EventCreateManyUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  guestCount: z.number().int().optional().nullable(),
  type: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
  completionRate: z.number().int().optional().nullable(),
  status: z.lazy(() => EventStatusEnumSchema).optional(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  customId: z.string().optional().nullable()
}).strict();

export const RatingCreateManyUserInputSchema: z.ZodType<Prisma.RatingCreateManyUserInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  vendorId: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutUserInputSchema: z.ZodType<Prisma.EventUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookings: z.lazy(() => BookingUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bookings: z.lazy(() => BookingUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutEventNestedInputSchema).optional(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  guestCount: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  totalPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  completionRate: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EventStatusEnumSchema),z.lazy(() => EnumEventStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  customId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RatingUpdateWithoutUserInputSchema: z.ZodType<Prisma.RatingUpdateWithoutUserInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutRatingsNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutUserInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutUserInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateManyVendorInputSchema: z.ZodType<Prisma.ServiceCreateManyVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceCreateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const ProductCreateManyVendorInputSchema: z.ZodType<Prisma.ProductCreateManyVendorInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  isConsumable: z.boolean().optional().nullable(),
  onRent: z.boolean().optional().nullable(),
  pricingModel: z.lazy(() => PricingModelSchema),
  embeddedLookupId: z.string(),
  status: z.lazy(() => PublishStatusSchema).optional(),
  images: z.union([ z.lazy(() => ProductCreateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const RatingCreateManyVendorInputSchema: z.ZodType<Prisma.RatingCreateManyVendorInput> = z.object({
  id: z.string().optional(),
  rating: z.number(),
  comment: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const ServiceUpdateWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventService: z.lazy(() => EventServiceUpdateManyWithoutServiceNestedInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventService: z.lazy(() => EventServiceUncheckedUpdateManyWithoutServiceNestedInputSchema).optional(),
  discounts: z.lazy(() => ServiceDiscountUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateManyWithoutVendorInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventIDs: z.union([ z.lazy(() => ServiceUpdateeventIDsInputSchema),z.string().array() ]).optional(),
  tags: z.union([ z.lazy(() => ServiceUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProductUpdateWithoutVendorInputSchema: z.ZodType<Prisma.ProductUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventProduct: z.lazy(() => EventProductUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutVendorInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventProduct: z.lazy(() => EventProductUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutVendorInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutVendorInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isConsumable: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  onRent: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pricingModel: z.union([ z.lazy(() => PricingModelSchema),z.lazy(() => EnumPricingModelFieldUpdateOperationsInputSchema) ]).optional(),
  embeddedLookupId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => PublishStatusSchema),z.lazy(() => EnumPublishStatusFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.union([ z.lazy(() => ProductUpdateimagesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RatingUpdateWithoutVendorInputSchema: z.ZodType<Prisma.RatingUpdateWithoutVendorInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRatingsNestedInputSchema).optional()
}).strict();

export const RatingUncheckedUpdateWithoutVendorInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateWithoutVendorInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RatingUncheckedUpdateManyWithoutVendorInputSchema: z.ZodType<Prisma.RatingUncheckedUpdateManyWithoutVendorInput> = z.object({
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventServiceCreateManyServiceInputSchema: z.ZodType<Prisma.EventServiceCreateManyServiceInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const ServiceDiscountCreateManyServiceInputSchema: z.ZodType<Prisma.ServiceDiscountCreateManyServiceInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => DiscountTypeSchema),
  threshold: z.number().optional().nullable(),
  discount: z.number(),
  isPercentage: z.boolean()
}).strict();

export const EventServiceUpdateWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUpdateWithoutServiceInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneWithoutEventServicesNestedInputSchema).optional()
}).strict();

export const EventServiceUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateWithoutServiceInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutServiceInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceDiscountUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUpdateWithoutServiceInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedUpdateWithoutServiceInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceDiscountUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceDiscountUncheckedUpdateManyWithoutServiceInput> = z.object({
  type: z.union([ z.lazy(() => DiscountTypeSchema),z.lazy(() => EnumDiscountTypeFieldUpdateOperationsInputSchema) ]).optional(),
  threshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  discount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isPercentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventProductCreateManyProductInputSchema: z.ZodType<Prisma.EventProductCreateManyProductInput> = z.object({
  id: z.string().optional(),
  eventId: z.string().optional().nullable()
}).strict();

export const EventProductUpdateWithoutProductInputSchema: z.ZodType<Prisma.EventProductUpdateWithoutProductInput> = z.object({
  event: z.lazy(() => EventUpdateOneWithoutEventProductNestedInputSchema).optional()
}).strict();

export const EventProductUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateWithoutProductInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventProductUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateManyWithoutProductInput> = z.object({
  eventId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BookingCreateManyEventInputSchema: z.ZodType<Prisma.BookingCreateManyEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => BookingStatusEnumSchema).optional(),
  paymentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventServiceCreateManyEventInputSchema: z.ZodType<Prisma.EventServiceCreateManyEventInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  conversationId: z.string().optional().nullable()
}).strict();

export const EventProductCreateManyEventInputSchema: z.ZodType<Prisma.EventProductCreateManyEventInput> = z.object({
  id: z.string().optional(),
  productId: z.string()
}).strict();

export const BookingUpdateWithoutEventInputSchema: z.ZodType<Prisma.BookingUpdateWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  payment: z.lazy(() => PaymentUpdateOneRequiredWithoutBookingNestedInputSchema).optional()
}).strict();

export const BookingUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BookingUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.BookingUncheckedUpdateManyWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => BookingStatusEnumSchema),z.lazy(() => EnumBookingStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  paymentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventServiceUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUpdateWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional(),
  conversation: z.lazy(() => ConversationUpdateOneWithoutEventServicesNestedInputSchema).optional()
}).strict();

export const EventServiceUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutEventInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventProductUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventProductUpdateWithoutEventInput> = z.object({
  product: z.lazy(() => ProductUpdateOneRequiredWithoutEventProductNestedInputSchema).optional()
}).strict();

export const EventProductUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateWithoutEventInput> = z.object({
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventProductUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.EventProductUncheckedUpdateManyWithoutEventInput> = z.object({
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyConversationInputSchema: z.ZodType<Prisma.MessageCreateManyConversationInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string(),
  senderId: z.string(),
  status: z.lazy(() => MessageStatusEnumSchema).optional(),
  attachment: InputJsonValueSchema.optional().nullable()
}).strict();

export const EventServiceCreateManyConversationInputSchema: z.ZodType<Prisma.EventServiceCreateManyConversationInput> = z.object({
  id: z.string().optional(),
  status: z.lazy(() => ServiceBookingStatusSchema).optional(),
  eventId: z.string(),
  serviceId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const MessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutConversationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutConversationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => MessageStatusEnumSchema),z.lazy(() => EnumMessageStatusEnumFieldUpdateOperationsInputSchema) ]).optional(),
  attachment: z.union([ InputJsonValueSchema,InputJsonValueSchema ]).optional().nullable(),
}).strict();

export const EventServiceUpdateWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUpdateWithoutConversationInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutEventServiceNestedInputSchema).optional()
}).strict();

export const EventServiceUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateWithoutConversationInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventServiceUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.EventServiceUncheckedUpdateManyWithoutConversationInput> = z.object({
  status: z.union([ z.lazy(() => ServiceBookingStatusSchema),z.lazy(() => EnumServiceBookingStatusFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VendorFindFirstArgsSchema: z.ZodType<Prisma.VendorFindFirstArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VendorFindFirstOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorFindManyArgsSchema: z.ZodType<Prisma.VendorFindManyArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorAggregateArgsSchema: z.ZodType<Prisma.VendorAggregateArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorGroupByArgsSchema: z.ZodType<Prisma.VendorGroupByArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithAggregationInputSchema.array(),VendorOrderByWithAggregationInputSchema ]).optional(),
  by: VendorScalarFieldEnumSchema.array(),
  having: VendorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorFindUniqueArgsSchema: z.ZodType<Prisma.VendorFindUniqueArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VendorFindUniqueOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenFindManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindManyArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordResetTokenScalarFieldEnumSchema,PasswordResetTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordResetTokenAggregateArgsSchema: z.ZodType<Prisma.PasswordResetTokenAggregateArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithRelationInputSchema.array(),PasswordResetTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordResetTokenGroupByArgsSchema: z.ZodType<Prisma.PasswordResetTokenGroupByArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetTokenOrderByWithAggregationInputSchema.array(),PasswordResetTokenOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordResetTokenScalarFieldEnumSchema.array(),
  having: PasswordResetTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordResetTokenFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueOrThrowArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationInputSchema.array(),ProductOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventServiceFindFirstArgsSchema: z.ZodType<Prisma.EventServiceFindFirstArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereInputSchema.optional(),
  orderBy: z.union([ EventServiceOrderByWithRelationInputSchema.array(),EventServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: EventServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventServiceScalarFieldEnumSchema,EventServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventServiceFindFirstOrThrowArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereInputSchema.optional(),
  orderBy: z.union([ EventServiceOrderByWithRelationInputSchema.array(),EventServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: EventServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventServiceScalarFieldEnumSchema,EventServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventServiceFindManyArgsSchema: z.ZodType<Prisma.EventServiceFindManyArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereInputSchema.optional(),
  orderBy: z.union([ EventServiceOrderByWithRelationInputSchema.array(),EventServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: EventServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventServiceScalarFieldEnumSchema,EventServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventServiceAggregateArgsSchema: z.ZodType<Prisma.EventServiceAggregateArgs> = z.object({
  where: EventServiceWhereInputSchema.optional(),
  orderBy: z.union([ EventServiceOrderByWithRelationInputSchema.array(),EventServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: EventServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventServiceGroupByArgsSchema: z.ZodType<Prisma.EventServiceGroupByArgs> = z.object({
  where: EventServiceWhereInputSchema.optional(),
  orderBy: z.union([ EventServiceOrderByWithAggregationInputSchema.array(),EventServiceOrderByWithAggregationInputSchema ]).optional(),
  by: EventServiceScalarFieldEnumSchema.array(),
  having: EventServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventServiceFindUniqueArgsSchema: z.ZodType<Prisma.EventServiceFindUniqueArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereUniqueInputSchema,
}).strict() ;

export const EventServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventServiceFindUniqueOrThrowArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereUniqueInputSchema,
}).strict() ;

export const EventProductFindFirstArgsSchema: z.ZodType<Prisma.EventProductFindFirstArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereInputSchema.optional(),
  orderBy: z.union([ EventProductOrderByWithRelationInputSchema.array(),EventProductOrderByWithRelationInputSchema ]).optional(),
  cursor: EventProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventProductScalarFieldEnumSchema,EventProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventProductFindFirstOrThrowArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereInputSchema.optional(),
  orderBy: z.union([ EventProductOrderByWithRelationInputSchema.array(),EventProductOrderByWithRelationInputSchema ]).optional(),
  cursor: EventProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventProductScalarFieldEnumSchema,EventProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventProductFindManyArgsSchema: z.ZodType<Prisma.EventProductFindManyArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereInputSchema.optional(),
  orderBy: z.union([ EventProductOrderByWithRelationInputSchema.array(),EventProductOrderByWithRelationInputSchema ]).optional(),
  cursor: EventProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventProductScalarFieldEnumSchema,EventProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventProductAggregateArgsSchema: z.ZodType<Prisma.EventProductAggregateArgs> = z.object({
  where: EventProductWhereInputSchema.optional(),
  orderBy: z.union([ EventProductOrderByWithRelationInputSchema.array(),EventProductOrderByWithRelationInputSchema ]).optional(),
  cursor: EventProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventProductGroupByArgsSchema: z.ZodType<Prisma.EventProductGroupByArgs> = z.object({
  where: EventProductWhereInputSchema.optional(),
  orderBy: z.union([ EventProductOrderByWithAggregationInputSchema.array(),EventProductOrderByWithAggregationInputSchema ]).optional(),
  by: EventProductScalarFieldEnumSchema.array(),
  having: EventProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventProductFindUniqueArgsSchema: z.ZodType<Prisma.EventProductFindUniqueArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereUniqueInputSchema,
}).strict() ;

export const EventProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventProductFindUniqueOrThrowArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereUniqueInputSchema,
}).strict() ;

export const BookingFindFirstArgsSchema: z.ZodType<Prisma.BookingFindFirstArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BookingFindFirstOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingFindManyArgsSchema: z.ZodType<Prisma.BookingFindManyArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BookingScalarFieldEnumSchema,BookingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BookingAggregateArgsSchema: z.ZodType<Prisma.BookingAggregateArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithRelationInputSchema.array(),BookingOrderByWithRelationInputSchema ]).optional(),
  cursor: BookingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookingGroupByArgsSchema: z.ZodType<Prisma.BookingGroupByArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
  orderBy: z.union([ BookingOrderByWithAggregationInputSchema.array(),BookingOrderByWithAggregationInputSchema ]).optional(),
  by: BookingScalarFieldEnumSchema.array(),
  having: BookingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BookingFindUniqueArgsSchema: z.ZodType<Prisma.BookingFindUniqueArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BookingFindUniqueOrThrowArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const PaymentFindFirstArgsSchema: z.ZodType<Prisma.PaymentFindFirstArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentFindManyArgsSchema: z.ZodType<Prisma.PaymentFindManyArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentAggregateArgsSchema: z.ZodType<Prisma.PaymentAggregateArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentGroupByArgsSchema: z.ZodType<Prisma.PaymentGroupByArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithAggregationInputSchema.array(),PaymentOrderByWithAggregationInputSchema ]).optional(),
  by: PaymentScalarFieldEnumSchema.array(),
  having: PaymentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentFindUniqueArgsSchema: z.ZodType<Prisma.PaymentFindUniqueArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindUniqueOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const ConversationFindFirstArgsSchema: z.ZodType<Prisma.ConversationFindFirstArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindFirstOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindManyArgsSchema: z.ZodType<Prisma.ConversationFindManyArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationAggregateArgsSchema: z.ZodType<Prisma.ConversationAggregateArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationGroupByArgsSchema: z.ZodType<Prisma.ConversationGroupByArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithAggregationInputSchema.array(),ConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ConversationScalarFieldEnumSchema.array(),
  having: ConversationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationFindUniqueArgsSchema: z.ZodType<Prisma.ConversationFindUniqueArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindUniqueOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const ServiceDiscountFindFirstArgsSchema: z.ZodType<Prisma.ServiceDiscountFindFirstArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereInputSchema.optional(),
  orderBy: z.union([ ServiceDiscountOrderByWithRelationInputSchema.array(),ServiceDiscountOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceDiscountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceDiscountScalarFieldEnumSchema,ServiceDiscountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceDiscountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceDiscountFindFirstOrThrowArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereInputSchema.optional(),
  orderBy: z.union([ ServiceDiscountOrderByWithRelationInputSchema.array(),ServiceDiscountOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceDiscountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceDiscountScalarFieldEnumSchema,ServiceDiscountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceDiscountFindManyArgsSchema: z.ZodType<Prisma.ServiceDiscountFindManyArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereInputSchema.optional(),
  orderBy: z.union([ ServiceDiscountOrderByWithRelationInputSchema.array(),ServiceDiscountOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceDiscountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceDiscountScalarFieldEnumSchema,ServiceDiscountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceDiscountAggregateArgsSchema: z.ZodType<Prisma.ServiceDiscountAggregateArgs> = z.object({
  where: ServiceDiscountWhereInputSchema.optional(),
  orderBy: z.union([ ServiceDiscountOrderByWithRelationInputSchema.array(),ServiceDiscountOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceDiscountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceDiscountGroupByArgsSchema: z.ZodType<Prisma.ServiceDiscountGroupByArgs> = z.object({
  where: ServiceDiscountWhereInputSchema.optional(),
  orderBy: z.union([ ServiceDiscountOrderByWithAggregationInputSchema.array(),ServiceDiscountOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceDiscountScalarFieldEnumSchema.array(),
  having: ServiceDiscountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceDiscountFindUniqueArgsSchema: z.ZodType<Prisma.ServiceDiscountFindUniqueArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereUniqueInputSchema,
}).strict() ;

export const ServiceDiscountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceDiscountFindUniqueOrThrowArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereUniqueInputSchema,
}).strict() ;

export const RatingFindFirstArgsSchema: z.ZodType<Prisma.RatingFindFirstArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RatingFindFirstOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingFindManyArgsSchema: z.ZodType<Prisma.RatingFindManyArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RatingScalarFieldEnumSchema,RatingScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RatingAggregateArgsSchema: z.ZodType<Prisma.RatingAggregateArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithRelationInputSchema.array(),RatingOrderByWithRelationInputSchema ]).optional(),
  cursor: RatingWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingGroupByArgsSchema: z.ZodType<Prisma.RatingGroupByArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
  orderBy: z.union([ RatingOrderByWithAggregationInputSchema.array(),RatingOrderByWithAggregationInputSchema ]).optional(),
  by: RatingScalarFieldEnumSchema.array(),
  having: RatingScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RatingFindUniqueArgsSchema: z.ZodType<Prisma.RatingFindUniqueArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RatingFindUniqueOrThrowArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReportScalarFieldEnumSchema,ReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const VendorCreateArgsSchema: z.ZodType<Prisma.VendorCreateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([ VendorCreateInputSchema,VendorUncheckedCreateInputSchema ]),
}).strict() ;

export const VendorUpsertArgsSchema: z.ZodType<Prisma.VendorUpsertArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
  create: z.union([ VendorCreateInputSchema,VendorUncheckedCreateInputSchema ]),
  update: z.union([ VendorUpdateInputSchema,VendorUncheckedUpdateInputSchema ]),
}).strict() ;

export const VendorCreateManyArgsSchema: z.ZodType<Prisma.VendorCreateManyArgs> = z.object({
  data: z.union([ VendorCreateManyInputSchema,VendorCreateManyInputSchema.array() ]),
}).strict() ;

export const VendorDeleteArgsSchema: z.ZodType<Prisma.VendorDeleteArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorUpdateArgsSchema: z.ZodType<Prisma.VendorUpdateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([ VendorUpdateInputSchema,VendorUncheckedUpdateInputSchema ]),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorUpdateManyArgsSchema: z.ZodType<Prisma.VendorUpdateManyArgs> = z.object({
  data: z.union([ VendorUpdateManyMutationInputSchema,VendorUncheckedUpdateManyInputSchema ]),
  where: VendorWhereInputSchema.optional(),
}).strict() ;

export const VendorDeleteManyArgsSchema: z.ZodType<Prisma.VendorDeleteManyArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const PasswordResetTokenCreateArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  data: z.union([ PasswordResetTokenCreateInputSchema,PasswordResetTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const PasswordResetTokenUpsertArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpsertArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
  create: z.union([ PasswordResetTokenCreateInputSchema,PasswordResetTokenUncheckedCreateInputSchema ]),
  update: z.union([ PasswordResetTokenUpdateInputSchema,PasswordResetTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const PasswordResetTokenCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenCreateManyInputSchema,PasswordResetTokenCreateManyInputSchema.array() ]),
}).strict() ;

export const PasswordResetTokenDeleteArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenUpdateArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateArgs> = z.object({
  select: PasswordResetTokenSelectSchema.optional(),
  data: z.union([ PasswordResetTokenUpdateInputSchema,PasswordResetTokenUncheckedUpdateInputSchema ]),
  where: PasswordResetTokenWhereUniqueInputSchema,
}).strict() ;

export const PasswordResetTokenUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyArgs> = z.object({
  data: z.union([ PasswordResetTokenUpdateManyMutationInputSchema,PasswordResetTokenUncheckedUpdateManyInputSchema ]),
  where: PasswordResetTokenWhereInputSchema.optional(),
}).strict() ;

export const PasswordResetTokenDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteManyArgs> = z.object({
  where: PasswordResetTokenWhereInputSchema.optional(),
}).strict() ;

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
}).strict() ;

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
}).strict() ;

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
}).strict() ;

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventServiceCreateArgsSchema: z.ZodType<Prisma.EventServiceCreateArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  data: z.union([ EventServiceCreateInputSchema,EventServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const EventServiceUpsertArgsSchema: z.ZodType<Prisma.EventServiceUpsertArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereUniqueInputSchema,
  create: z.union([ EventServiceCreateInputSchema,EventServiceUncheckedCreateInputSchema ]),
  update: z.union([ EventServiceUpdateInputSchema,EventServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventServiceCreateManyArgsSchema: z.ZodType<Prisma.EventServiceCreateManyArgs> = z.object({
  data: z.union([ EventServiceCreateManyInputSchema,EventServiceCreateManyInputSchema.array() ]),
}).strict() ;

export const EventServiceDeleteArgsSchema: z.ZodType<Prisma.EventServiceDeleteArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  where: EventServiceWhereUniqueInputSchema,
}).strict() ;

export const EventServiceUpdateArgsSchema: z.ZodType<Prisma.EventServiceUpdateArgs> = z.object({
  select: EventServiceSelectSchema.optional(),
  include: EventServiceIncludeSchema.optional(),
  data: z.union([ EventServiceUpdateInputSchema,EventServiceUncheckedUpdateInputSchema ]),
  where: EventServiceWhereUniqueInputSchema,
}).strict() ;

export const EventServiceUpdateManyArgsSchema: z.ZodType<Prisma.EventServiceUpdateManyArgs> = z.object({
  data: z.union([ EventServiceUpdateManyMutationInputSchema,EventServiceUncheckedUpdateManyInputSchema ]),
  where: EventServiceWhereInputSchema.optional(),
}).strict() ;

export const EventServiceDeleteManyArgsSchema: z.ZodType<Prisma.EventServiceDeleteManyArgs> = z.object({
  where: EventServiceWhereInputSchema.optional(),
}).strict() ;

export const EventProductCreateArgsSchema: z.ZodType<Prisma.EventProductCreateArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  data: z.union([ EventProductCreateInputSchema,EventProductUncheckedCreateInputSchema ]),
}).strict() ;

export const EventProductUpsertArgsSchema: z.ZodType<Prisma.EventProductUpsertArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereUniqueInputSchema,
  create: z.union([ EventProductCreateInputSchema,EventProductUncheckedCreateInputSchema ]),
  update: z.union([ EventProductUpdateInputSchema,EventProductUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventProductCreateManyArgsSchema: z.ZodType<Prisma.EventProductCreateManyArgs> = z.object({
  data: z.union([ EventProductCreateManyInputSchema,EventProductCreateManyInputSchema.array() ]),
}).strict() ;

export const EventProductDeleteArgsSchema: z.ZodType<Prisma.EventProductDeleteArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  where: EventProductWhereUniqueInputSchema,
}).strict() ;

export const EventProductUpdateArgsSchema: z.ZodType<Prisma.EventProductUpdateArgs> = z.object({
  select: EventProductSelectSchema.optional(),
  include: EventProductIncludeSchema.optional(),
  data: z.union([ EventProductUpdateInputSchema,EventProductUncheckedUpdateInputSchema ]),
  where: EventProductWhereUniqueInputSchema,
}).strict() ;

export const EventProductUpdateManyArgsSchema: z.ZodType<Prisma.EventProductUpdateManyArgs> = z.object({
  data: z.union([ EventProductUpdateManyMutationInputSchema,EventProductUncheckedUpdateManyInputSchema ]),
  where: EventProductWhereInputSchema.optional(),
}).strict() ;

export const EventProductDeleteManyArgsSchema: z.ZodType<Prisma.EventProductDeleteManyArgs> = z.object({
  where: EventProductWhereInputSchema.optional(),
}).strict() ;

export const BookingCreateArgsSchema: z.ZodType<Prisma.BookingCreateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
}).strict() ;

export const BookingUpsertArgsSchema: z.ZodType<Prisma.BookingUpsertArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
  create: z.union([ BookingCreateInputSchema,BookingUncheckedCreateInputSchema ]),
  update: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
}).strict() ;

export const BookingCreateManyArgsSchema: z.ZodType<Prisma.BookingCreateManyArgs> = z.object({
  data: z.union([ BookingCreateManyInputSchema,BookingCreateManyInputSchema.array() ]),
}).strict() ;

export const BookingDeleteArgsSchema: z.ZodType<Prisma.BookingDeleteArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingUpdateArgsSchema: z.ZodType<Prisma.BookingUpdateArgs> = z.object({
  select: BookingSelectSchema.optional(),
  include: BookingIncludeSchema.optional(),
  data: z.union([ BookingUpdateInputSchema,BookingUncheckedUpdateInputSchema ]),
  where: BookingWhereUniqueInputSchema,
}).strict() ;

export const BookingUpdateManyArgsSchema: z.ZodType<Prisma.BookingUpdateManyArgs> = z.object({
  data: z.union([ BookingUpdateManyMutationInputSchema,BookingUncheckedUpdateManyInputSchema ]),
  where: BookingWhereInputSchema.optional(),
}).strict() ;

export const BookingDeleteManyArgsSchema: z.ZodType<Prisma.BookingDeleteManyArgs> = z.object({
  where: BookingWhereInputSchema.optional(),
}).strict() ;

export const PaymentCreateArgsSchema: z.ZodType<Prisma.PaymentCreateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
}).strict() ;

export const PaymentUpsertArgsSchema: z.ZodType<Prisma.PaymentUpsertArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
  create: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
  update: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
}).strict() ;

export const PaymentCreateManyArgsSchema: z.ZodType<Prisma.PaymentCreateManyArgs> = z.object({
  data: z.union([ PaymentCreateManyInputSchema,PaymentCreateManyInputSchema.array() ]),
}).strict() ;

export const PaymentDeleteArgsSchema: z.ZodType<Prisma.PaymentDeleteArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentUpdateArgsSchema: z.ZodType<Prisma.PaymentUpdateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentUpdateManyArgsSchema: z.ZodType<Prisma.PaymentUpdateManyArgs> = z.object({
  data: z.union([ PaymentUpdateManyMutationInputSchema,PaymentUncheckedUpdateManyInputSchema ]),
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export const PaymentDeleteManyArgsSchema: z.ZodType<Prisma.PaymentDeleteManyArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export const ConversationCreateArgsSchema: z.ZodType<Prisma.ConversationCreateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
}).strict() ;

export const ConversationUpsertArgsSchema: z.ZodType<Prisma.ConversationUpsertArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
  create: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ConversationCreateManyArgsSchema: z.ZodType<Prisma.ConversationCreateManyArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema,ConversationCreateManyInputSchema.array() ]),
}).strict() ;

export const ConversationDeleteArgsSchema: z.ZodType<Prisma.ConversationDeleteArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateArgsSchema: z.ZodType<Prisma.ConversationUpdateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateManyArgsSchema: z.ZodType<Prisma.ConversationUpdateManyArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema,ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const ConversationDeleteManyArgsSchema: z.ZodType<Prisma.ConversationDeleteManyArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const ServiceDiscountCreateArgsSchema: z.ZodType<Prisma.ServiceDiscountCreateArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  data: z.union([ ServiceDiscountCreateInputSchema,ServiceDiscountUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceDiscountUpsertArgsSchema: z.ZodType<Prisma.ServiceDiscountUpsertArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereUniqueInputSchema,
  create: z.union([ ServiceDiscountCreateInputSchema,ServiceDiscountUncheckedCreateInputSchema ]),
  update: z.union([ ServiceDiscountUpdateInputSchema,ServiceDiscountUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceDiscountCreateManyArgsSchema: z.ZodType<Prisma.ServiceDiscountCreateManyArgs> = z.object({
  data: z.union([ ServiceDiscountCreateManyInputSchema,ServiceDiscountCreateManyInputSchema.array() ]),
}).strict() ;

export const ServiceDiscountDeleteArgsSchema: z.ZodType<Prisma.ServiceDiscountDeleteArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  where: ServiceDiscountWhereUniqueInputSchema,
}).strict() ;

export const ServiceDiscountUpdateArgsSchema: z.ZodType<Prisma.ServiceDiscountUpdateArgs> = z.object({
  select: ServiceDiscountSelectSchema.optional(),
  include: ServiceDiscountIncludeSchema.optional(),
  data: z.union([ ServiceDiscountUpdateInputSchema,ServiceDiscountUncheckedUpdateInputSchema ]),
  where: ServiceDiscountWhereUniqueInputSchema,
}).strict() ;

export const ServiceDiscountUpdateManyArgsSchema: z.ZodType<Prisma.ServiceDiscountUpdateManyArgs> = z.object({
  data: z.union([ ServiceDiscountUpdateManyMutationInputSchema,ServiceDiscountUncheckedUpdateManyInputSchema ]),
  where: ServiceDiscountWhereInputSchema.optional(),
}).strict() ;

export const ServiceDiscountDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDiscountDeleteManyArgs> = z.object({
  where: ServiceDiscountWhereInputSchema.optional(),
}).strict() ;

export const RatingCreateArgsSchema: z.ZodType<Prisma.RatingCreateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
}).strict() ;

export const RatingUpsertArgsSchema: z.ZodType<Prisma.RatingUpsertArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
  create: z.union([ RatingCreateInputSchema,RatingUncheckedCreateInputSchema ]),
  update: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
}).strict() ;

export const RatingCreateManyArgsSchema: z.ZodType<Prisma.RatingCreateManyArgs> = z.object({
  data: z.union([ RatingCreateManyInputSchema,RatingCreateManyInputSchema.array() ]),
}).strict() ;

export const RatingDeleteArgsSchema: z.ZodType<Prisma.RatingDeleteArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingUpdateArgsSchema: z.ZodType<Prisma.RatingUpdateArgs> = z.object({
  select: RatingSelectSchema.optional(),
  include: RatingIncludeSchema.optional(),
  data: z.union([ RatingUpdateInputSchema,RatingUncheckedUpdateInputSchema ]),
  where: RatingWhereUniqueInputSchema,
}).strict() ;

export const RatingUpdateManyArgsSchema: z.ZodType<Prisma.RatingUpdateManyArgs> = z.object({
  data: z.union([ RatingUpdateManyMutationInputSchema,RatingUncheckedUpdateManyInputSchema ]),
  where: RatingWhereInputSchema.optional(),
}).strict() ;

export const RatingDeleteManyArgsSchema: z.ZodType<Prisma.RatingDeleteManyArgs> = z.object({
  where: RatingWhereInputSchema.optional(),
}).strict() ;

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() ;

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: z.union([ ReportCreateManyInputSchema,ReportCreateManyInputSchema.array() ]),
}).strict() ;

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() ;

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
}).strict() ;

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
}).strict() ;