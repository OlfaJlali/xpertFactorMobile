import { BuyerDatatype } from "./buyersDataTypes";
import { documentsDataTypes } from "./documentsDataTypes";
export type Document = {
    BuyerData : BuyerDatatype,
    title : string
}
export type RootStackParamList = {
    PrivacyPolicy: undefined ; 
    Onboarding: undefined;
    SignIn: undefined;
    Dashboard: undefined;
    ForgotPassword: undefined;
    VerifyScreen: undefined;
    ChangePasswordScreen: undefined;
    Bordoreaux: undefined;
    Congratulations: undefined;
    Profile: undefined;
    MyAccount: undefined;
    Settings: undefined;
    ResetPassword: undefined;
    Notifications: undefined;
    CurrentScreen: undefined;
    BordoreauxStarter: undefined;
    FinancementStarter: undefined;
    RequestFinancement: {
        totalAmout: string ,
        date : Date ,
        type : string
    }
    BordoreauxForm: {
        totalAmount: string;
        date: Date;
        selectedYear: number;
        documentCount: number;
    };    
    Litige : undefined
    LitigeDocument: Document;
    LitigeDate: { LitigeDate: { buyerData: BuyerDatatype; document: documentsDataTypes } };
    LimitBuyer: { pageTitle: string , handlePress: (buyer: BuyerDatatype) => void  };
    LimitForm: BuyerDatatype;
    Prorogation : undefined
    ProrogationDocument: Document;
    ProrogationDate: { ProrogationDate: { buyerData: BuyerDatatype; document: documentsDataTypes } };
    Buyer: undefined;
    ChangeFirstPassword: undefined;
  };
  