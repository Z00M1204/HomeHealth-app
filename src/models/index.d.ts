import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class UserStats {
  readonly id: string;
  readonly highScore?: number;
  readonly averageScore?: number;
  constructor(init: ModelInit<UserStats>);
  static copyOf(source: UserStats, mutator: (draft: MutableModel<UserStats>) => MutableModel<UserStats> | void): UserStats;
}

export declare class StatSet {
  readonly id: string;
  readonly AirQuality?: number;
  readonly Username?: string;
  constructor(init: ModelInit<StatSet>);
  static copyOf(source: StatSet, mutator: (draft: MutableModel<StatSet>) => MutableModel<StatSet> | void): StatSet;
}

export declare class PublicStatSet {
  readonly id: string;
  readonly TopAirQuality?: number;
  readonly Username?: string;
  readonly AuthID?: string;
  constructor(init: ModelInit<PublicStatSet>);
  static copyOf(source: PublicStatSet, mutator: (draft: MutableModel<PublicStatSet>) => MutableModel<PublicStatSet> | void): PublicStatSet;
}

export declare class UserInfo {
  readonly id: string;
  readonly Username?: string;
  readonly UserAuthID?: string;
  constructor(init: ModelInit<UserInfo>);
  static copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo>) => MutableModel<UserInfo> | void): UserInfo;
}