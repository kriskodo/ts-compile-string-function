type IsParameter<Part> = Part extends `{{${infer ParamName}}}`
    ? ParamName
    : never;
    
type FilteredParts<DomString> = DomString extends `${infer PartA} ${infer PartB}`
    ? IsParameter<PartA> | FilteredParts<PartB>
    : IsParameter<DomString>;
 
type ParamValue<Key> = Key extends `...${infer _Anything}` ? string[] : any;
 
type NormalizedKey<Key> = Key extends `...${infer KeyName}` ? KeyName : Key;
 
export type Params<DomString> = {
    [Key in FilteredParts<DomString> as NormalizedKey<Key>]: ParamValue<Key>
}