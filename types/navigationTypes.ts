import { BuyerDatatype } from "./buyersDataTypes";
import { documentsDataTypes } from "./documentsDataTypes";

export type RootStackParamList = {
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
    LitigeDocument: BuyerDatatype;
    LitigeDate: { LitigeDate: { buyerData: BuyerDatatype; document: documentsDataTypes } };
  };
  