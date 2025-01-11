import { User } from "../domain/entities/User";
import { BuyerDatatype } from "./buyersDataTypes";
import { Document } from '../domain/entities/document';


export type RootStackParamList = {
    PrivacyPolicy: undefined ; 
    Onboarding: undefined;
    SignIn: undefined;
    Dashboard: undefined;
    ForgotPassword: undefined;
    VerifyScreen: {email: string};
    ChangePasswordScreen: {email: string};
    Bordoreaux: undefined;
    Congratulations: undefined;
    Profile: undefined
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
        totalAmount: Number;
        date: string;
        selectedYear: number;
        documentCount: number;
    };    
    Litige : undefined
    LitigeDocument: {
        title: string
        id: string
    };
    LitigeDate: { documentId: string};
    LimitBuyer: { pageTitle: string , handlePress: (buyer: BuyerDatatype) => void  };
    LimitForm: {buyerId: string};
    Prorogation : undefined
    ProrogationDocument: {title: string, id:string};
    ProrogationDate: { documentId: string };
    Buyer: undefined;
    ChangeFirstPassword: {email: string}
  };
  