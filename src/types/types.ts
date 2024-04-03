export type FiltersLiterals = 'apr' | 'apr_30days' | 'apr_365days'
export type Heading = string
export type TableRow = Record<string, any>
export type CollectionItem = number | string | Record<string, any>

export interface TableField {
	fieldSelector: string
	theme?: string
	subSelector?: string
}
