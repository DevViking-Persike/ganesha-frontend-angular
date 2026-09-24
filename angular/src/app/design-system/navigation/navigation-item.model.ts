/**
 * Port de `Abstractions/Navigation/INavigationItem.cs` e
 * `Models/Navigation/NavigationItemModel.cs`.
 */
export interface INavigationItem {
  readonly label: string;
  readonly icon?: string | null;
  readonly href?: string | null;
  readonly isActive: boolean;
  readonly children?: readonly INavigationItem[] | null;
}

export interface NavigationItemModel extends INavigationItem {
  readonly badge?: string | null;
  readonly isExpanded: boolean;
}
