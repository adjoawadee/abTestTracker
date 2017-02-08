export class CompareDates{

  compareDates(start_date:string, end_date:string): boolean{
    let currentDate = new Date();
    let minDate = new Date(start_date);
    let maxDate = new Date(end_date);

    if(currentDate >= minDate && currentDate <= maxDate){
      return true;
    }
    else {
      return false;
    }
  };
}
