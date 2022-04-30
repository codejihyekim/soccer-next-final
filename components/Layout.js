import style from "@/styles/Layout.module.css";
import { Table, PageNations,  Model} from "@/components";

export function Layout({ children }){
  return (
        <div className={style.container}>
        <main className={style.main}>{children}</main>
        <Table/>
        <PageNations/>
        <Model/>
      </div>
  );
}