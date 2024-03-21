import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 30,
    color: "#475569",
  },
  subtitle: {
    fontWeight: "600",
    fontSize: 25,
    color: "#475569",
  },
  taskWrapper: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
    padding: 12,
    borderRadius: 5,
    marginVertical: 5
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: '#94a3b8',
    borderWidth: 1,
    height: 40
  },
  btn: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  btnText: { 
    color: '#f1f5f9', 
    textAlign: 'center' ,
    fontSize: 16,
    fontWeight: '700'
  },
  avatar: {
    width: 40,
    height:40,
    borderRadius: 20
  },
  card :{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flex: 1
  },
  footer :{
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    gap: 10
  },
  between: {
    flexDirection: "row", 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  }
});