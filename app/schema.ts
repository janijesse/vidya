import { Entity, Type } from '@graphprotocol/hypergraph';

export class Image extends Entity.Class<Image>('Image')({
  url: Type.String,
}) {}

export class Project extends Entity.Class<Project>('Project')({
  name: Type.String,
  description: Type.optional(Type.String),
  xUrl: Type.optional(Type.String),
  avatar: Type.Relation(Image),
}) {}

export class Dapp extends Entity.Class<Dapp>('Dapp')({
  name: Type.String,
  description: Type.optional(Type.String),
  xUrl: Type.optional(Type.String),
  githubUrl: Type.optional(Type.String),
  avatar: Type.Relation(Image),
}) {}

export class Investor extends Entity.Class<Investor>('Investor')({
  name: Type.String,
}) {}

export class FundingStage extends Entity.Class<FundingStage>('FundingStage')({
  name: Type.String,
}) {}

export class InvestmentRound extends Entity.Class<InvestmentRound>('InvestmentRound')({
  name: Type.String,
  raisedAmount: Type.optional(Type.Number),
  investors: Type.Relation(Investor),
  fundingStages: Type.Relation(FundingStage),
  raisedBy: Type.Relation(Project),
}) {}

export class Asset extends Entity.Class<Asset>('Asset')({
  name: Type.String,
  symbol: Type.optional(Type.String),
  blockchainAddress: Type.optional(Type.String),
}) {}

// Student Sponsorship System Schemas
export class Student extends Entity.Class<Student>('Student')({
  name: Type.String,
  age: Type.Number,
  grade: Type.String,
  location: Type.String,
  description: Type.optional(Type.String),
  monthlyGoal: Type.Number,
  currentRaised: Type.Number,
  subjects: Type.optional(Type.String), // JSON string of subjects array
  avatar: Type.optional(Type.String),
  isActive: Type.Boolean,
  schoolId: Type.optional(Type.String),
}) {}

export class Sponsor extends Entity.Class<Sponsor>('Sponsor')({
  name: Type.String,
  email: Type.optional(Type.String),
  walletAddress: Type.optional(Type.String),
  totalDonated: Type.Number,
  isVerified: Type.Boolean,
  avatar: Type.optional(Type.String),
}) {}

export class Donation extends Entity.Class<Donation>('Donation')({
  amount: Type.Number,
  currency: Type.String,
  transactionHash: Type.optional(Type.String),
  status: Type.String, // 'pending', 'confirmed', 'failed'
  donationDate: Type.String, // ISO date string
  message: Type.optional(Type.String),
  sponsor: Type.Relation(Sponsor),
  student: Type.Relation(Student),
}) {}

export class School extends Entity.Class<School>('School')({
  name: Type.String,
  location: Type.String,
  description: Type.optional(Type.String),
  isVerified: Type.Boolean,
  contactEmail: Type.optional(Type.String),
  website: Type.optional(Type.String),
}) {}

export class ProgressUpdate extends Entity.Class<ProgressUpdate>('ProgressUpdate')({
  title: Type.String,
  description: Type.String,
  updateDate: Type.String, // ISO date string
  attachments: Type.optional(Type.String), // JSON string of attachment URLs
  student: Type.Relation(Student),
  createdBy: Type.Relation(Sponsor),
}) {}
